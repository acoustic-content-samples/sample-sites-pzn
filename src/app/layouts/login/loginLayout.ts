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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

export class LoginLayoutComponent extends TypeLoginComponent implements OnInit {

	form: FormGroup;
	pznArr: any;

    constructor(fb: FormBuilder, private router: Router, private authService: AuthService) {
        super();
		this.form = fb.group({
			'name' : '',
			'pw': '',
			'pzn' : ''
		});
    }

	ngOnInit() {
		super.ngOnInit();
		this.pznArr = this.pznRoleTags ? JSON.parse(this.pznRoleTags) : [];
	}

	onSubmit(form: any) {
		this.authService.login(form.name, form.pzn);
		this.router.navigate(['home']);
	}

}
