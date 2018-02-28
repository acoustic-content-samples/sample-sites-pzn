import { LayoutComponent } from 'ibm-wch-sdk-ng';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TypePersonalizedItemComponent } from './../../components/personalized-item/typePersonalizedItemComponent';
import { AuthService } from '../../common/authService/auth.service';
import { UtilsService } from '../../common/utils/utils.service';

/*
 * @name personalizedItemLayout
 * @id personalized-item-layout
 */
@LayoutComponent({
	selector: 'personalized-item-layout'
})
@Component({
  selector: 'app-personalized-item-layout-component',
  templateUrl: './personalizedItemLayout.html',
  styleUrls: ['./personalizedItemLayout.scss'],
  preserveWhitespaces: false
})
export class PersonalizedItemLayoutComponent extends TypePersonalizedItemComponent implements OnInit, OnDestroy {

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
			this.pzn_tag = userInfo ? userInfo.pzn : '';
			this.updateQuery();
		});
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}

	updateQuery() {
		// query for 1 item if the user is logged in, based on the personalization tag for that user's role
		if(this.isLoggedIn && this.pzn_tag) {
			this.queryString = `fl=document:%5Bjson%5D,lastModified&fq=classification:(content)&fq=type:("${this.TYPE}")&fq=tags:(${this.pzn_tag})&rows=1`;
		}
	}

}
