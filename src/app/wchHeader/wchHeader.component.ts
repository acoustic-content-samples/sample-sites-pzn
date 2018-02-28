/*******************************************************************************
 * Copyright IBM Corp. 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
import {
	Component,
	Input,
	OnDestroy,
	ViewChildren,
	QueryList,
	ViewEncapsulation, OnChanges, SimpleChanges
} from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

import { LayoutComponent, RenderingContext, AbstractRenderingComponent } from 'ibm-wch-sdk-ng';
import { ConfigServiceService } from '../common/configService/config-service.service';
import { Constants } from '../Constants';
import { environment } from '../environment/environment';
import { AuthService } from '../common/authService/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'wch-header',
	styleUrls: ['./wch-header.scss'],
	templateUrl: './wch-header.html',
	encapsulation: ViewEncapsulation.None
})
export class WchHeaderComponent implements OnChanges, OnDestroy {
	@Input()
	public set renderingContext(aValue: RenderingContext) {
		this.rc = aValue;
	}

	@ViewChildren('navLoop') navLoop: QueryList<any>;

	rc: RenderingContext;
	headerConfig: any;
	public readonly LOGO: string = 'websiteLogo';
	public readonly TITLE: string = 'siteTitle';
	public readonly ICON: string = 'iconClass';
	configSub: Subscription;
	authSub: Subscription;
	pages = [];
	loading: boolean = false;
	isLoggedIn: boolean = false;
	username: string = '';
	pzn_tag: string = '';

	constructor(private http: Http, private router: Router, private configService: ConfigServiceService, private authService: AuthService) {
		this.configSub = configService.getConfig(Constants.HEADER_CONFIG).subscribe(context => {
			this.headerConfig = context;
		});
	}
 
	ngOnInit() {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.username = this.authService.getName();
		this.pzn_tag = this.authService.getPZN();
		this.refreshPages();
		this.authSub = this.authService.authUpdate.subscribe(userInfo => {
			this.isLoggedIn = !!userInfo;
			this.username = userInfo ? userInfo.name : '';
			this.pzn_tag = userInfo ? userInfo.pzn : '';
			this.refreshPages();
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['renderingContext'].currentValue !== changes['renderingContext'].previousValue) {
			//this.refreshPages();
		}
	}

	ngOnDestroy() {
		this.configSub.unsubscribe();
		this.authSub.unsubscribe();
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['home']);
	}

	refreshPages() {
		const pznTagQuery = this.pzn_tag ? `OR tags:(${this.pzn_tag}))` : ')';
		const pageSearchUrl = `${environment.apiUrl}/delivery/v1/search?q=*:*&fl=name,id&fq=classification:content&fq=type:("Standard page" OR "Design page")&fq=((*:* AND -tags:wch_pzn_*)${pznTagQuery}`;

		this.loading = true;
		this.http.get(pageSearchUrl).subscribe(res => {
			const pageDocs = res.json();
			this.pages = pageDocs && pageDocs.numFound > 0 ? this.filterPages(pageDocs.documents) : [];
			this.loading = false;
			console.log('Filtered pages are: %o', this.pages);
		}, error => {
			this.pages = this.rc && this.rc.context ? this.rc.context.site.pages : [];
			this.loading = false;
			console.error('Error retrieving filtered page content items: %o. Fallback to using site pages: %o', error, this.pages);
		});
	}

	filterPages(taggedPages, sitePages?) {
		sitePages = sitePages ? sitePages : this.rc && this.rc.context ? this.rc.context.site.pages : [];
		console.log('Filtering the site pages  %o  by the tagged page content item search result  %o', sitePages, taggedPages);
		// filter sitePages by what is in taggedPages
		// a sitePage is rejected if there is not a taggedPage with an id that matches the sitePage's contentId
		return sitePages.filter(sitePage => {
			// filter 1 level of children
			if(sitePage.children.length) {
				sitePage.children = this.filterPages(taggedPages, sitePage.children);
			}
			return taggedPages.some(taggedPage => taggedPage.id === sitePage.contentId);
		});
	}

	isStrAvailable(elem): boolean {
		return (this.rc && this.headerConfig && this.headerConfig.elements && this.headerConfig.elements[elem]);
	}

	isUrlAvailable(elem): boolean {
		return (this.rc && this.headerConfig && this.headerConfig.elements && this.headerConfig.elements[elem] && this.headerConfig.elements[elem].renditions);
	}

	getStr(str) {
		return this.headerConfig.elements[str].value;
	}

	getURL(img) {
		return this.rc.context.hub.deliveryUrl['origin'] + this.headerConfig.elements[img].renditions.default.url;
	}

	getRouteURL(url) {
		return decodeURI(url);
	}
}
