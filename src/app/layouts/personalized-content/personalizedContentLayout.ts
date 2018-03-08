import { LayoutComponent } from 'ibm-wch-sdk-ng';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TypePersonalizedContentComponent } from './../../components/personalized-content/typePersonalizedContentComponent';
import { AuthService } from '../../common/authService/auth.service';
import { UtilsService } from '../../common/utils/utils.service';

/*
 * @name personalizedContentLayout
 * @id personalized-content-layout
 */
@LayoutComponent({
	selector: 'personalized-content-layout'
})
@Component({
  selector: 'app-personalized-content-layout-component',
  templateUrl: './personalizedContentLayout.html',
  styleUrls: ['./personalizedContentLayout.scss'],
  preserveWhitespaces: false
})
export class PersonalizedContentLayoutComponent extends TypePersonalizedContentComponent implements OnInit, OnDestroy {

	readonly TYPE: string = 'Image with information';
	authSub: Subscription;
	isLoggedIn: boolean = false;
	username: string = '';
	pzn_tag: string = '';
    queryString: string = null;

	constructor(private authService: AuthService, private utilService: UtilsService) {
		super();
	}
 
	ngOnInit() {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.username = this.authService.getName();
		this.pzn_tag = this.authService.getPZN();
		this.updateQuery();
		this.authSub = this.authService.authUpdate.subscribe(userInfo => {
			this.isLoggedIn = !!userInfo;
			this.username = userInfo ? userInfo.name : '';
			this.pzn_tag = userInfo && userInfo.pzn !=='NO_ROLE' ? userInfo.pzn : '';
			this.updateQuery();
		});
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}

	updateQuery() {
		// query for 1 piece of content, based on the personalization tag for that user's role, if available
		const pznTagQuery = this.pzn_tag ? `OR tags:(${this.pzn_tag}))` : ')';
		this.queryString = `fl=document:%5Bjson%5D,lastModified&fq=classification:(content)&fq=type:("${this.TYPE}")&fq=((*:* AND -tags:wch_pzn_*)${pznTagQuery}&rows=1`;
	}

}
