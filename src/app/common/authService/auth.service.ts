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
import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import { Constants } from '../../Constants';

@Injectable()
export class AuthService {

	// Observable authentication status
	private _isLoggedIn: boolean = false;
	private _name: string = '';
	private _pzn: string = '';
	private _observer: Observer<any>;
	authUpdate: Observable<any>;

	constructor() {
		// share() allows multiple subscribers to the Observable change
		this.authUpdate = new Observable<boolean>(observer => this._observer = observer).share();

		// get cached user info
		const userInfoStr = localStorage[Constants.PZN_KEY];
		const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
		if(userInfo) {
			this._isLoggedIn = true;
			this._name = userInfo.name;
			this._pzn = userInfo.pzn;
		}
	}

	isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	getName(): string {
		return this._name;
	}

	getPZN(): string {
		return this._pzn;
	}

	login(name: string, pzn: string)/*: Promise<any>*/ {
		// cache user info
		const userInfo = {
			name: name,
			pzn: pzn
		};
		try {
			localStorage.setItem(Constants.PZN_KEY, JSON.stringify(userInfo));
		} catch(e) {
			console.warn('Local storage is filled. Login information will not be persisted until it is cleared.');
		}
		// update internal variables
		this._isLoggedIn = true;
		this._name = name;
		this._pzn = pzn;
		if(this._observer) {
			this._observer.next(userInfo);	// update the subscribers to the user info
		}
	}

	logout() {
		// delete the cached user info
		localStorage.removeItem(Constants.PZN_KEY);
		// reset all internal variables 
		this._isLoggedIn = false;
		this._name = '';
		this._pzn = '';
		if(this._observer) {
			this._observer.next(null);	// update the subscribers to the user info
		}
	}
}
