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
import { LayoutComponent } from 'ibm-wch-sdk-ng';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TypeLoginComponent } from './../../components/login/typeLoginComponent';
import { Constants } from '../../Constants';
import { AuthService } from '../../common/authService/auth.service';

/*
 * @name loginLayout
 * @id login-layout
 */
@LayoutComponent({
    selector: 'login-layout'
})
@Component({
  selector: 'app-login-layout-component',
  templateUrl: './loginLayout.html',
  styleUrls: ['./loginLayout.scss'],
  preserveWhitespaces: false
})

export class LoginLayoutComponent extends TypeLoginComponent implements OnInit, OnDestroy {

	authSub: Subscription;
	form: FormGroup;
	pznArr: any;
	loading: boolean = false;

    constructor(fb: FormBuilder, private router: Router, private authService: AuthService) {
        super();
		// initialize the form
		this.form = fb.group({
			'name' : '',
			'pw': '',
			'pzn' : ''
		});
		// subscribe to login/logout changes to update the loading screen
		this.authSub = this.authService.authUpdate.subscribe(
			() => {
				if(this.loading) {
					// navigate to the home page
					this.router.navigate(['home']);
				}
				this.loading = false;
			},
			e => {
				this.loading = false;
				console.error('Authentication error: %o', e);
			}
    	)
	}

	ngOnInit() {
		// initialize form dropdown or available role tags
		super.ngOnInit();
		this.pznArr = this.renderRoleTagsList && this.pznRoleTags ? JSON.parse(this.pznRoleTags) : this.pznUserTags ? JSON.parse(this.pznUserTags) : [];
		console.log('Login form working with these tags: %o', this.pznArr);
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}

	onSubmit(form: any) {
		// submit user login data to authentication service
		this.loading = true;
		let tag;
		// user picked role
		if(this.renderRoleTagsList) {
			tag = form.pzn;
		// role based on username
		} else {
			const aMatch = this.pznArr.find(t => t.user === form.name.trim());
			tag = aMatch ? aMatch.tag : undefined;
		}
		this.authService.login(form.name, tag);
	}

}
