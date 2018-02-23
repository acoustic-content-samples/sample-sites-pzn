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
'use strict'

/**
 *  The Sites Kicker entrypoint pageobject class
 */
class SitesKicker {

	constructor() {}

	/**
	 * Gives access to SPA header functions
	 * @returns {SPAHeader}
	 */
	header() {
		var SPAHeader = require('./SPAHeader');
		return new SPAHeader();
	}

	/**
	 * Installs prod-sites-kicker dependencies
	 */
	install() {
		var exec = require('child_process').execSync;
		var path = require('path');
		var currentWorkingDir = path.resolve(process.cwd());
		console.log("Running npm install in " + currentWorkingDir);

		exec('npm install', {
			cwd: currentWorkingDir
		}, function(error, stdout, stderr) {
			console.log(stdout);
		});
	}

	/**
	 * Init wchtools
	 * @param tenantId - tenat id
	 * @param username - tenant user username
	 * @param api_gateway_url - base api url for eg. https://digitalexperience.ibm.com
	 */
	initWchtools(tenantId, username, api_gateway_url) {
		return browser.controlFlow().execute(function() {
			var fs = require('fs');
			var path = require('path');
			console.log("Init WchTools");

			var api_tenant_url = api_gateway_url + "/api/" + tenantId;
			console.log("API Tenant-Base URL: " + api_tenant_url);

			return new Promise(function(fulfill, reject) {
				fs.writeFile('.wchtoolsoptions', '{"username": "' + username + '", "x-ibm-dx-tenant-base-url": "' + api_tenant_url + '"}', function(err) {
					if (err)
						reject(err);
					console.log('Init completed');
					fulfill("Init Completed");
				});
			});
		})

	}

	/**
	 * Init sites(Executes npm run init-site)
	 */
	initSites() {
		var exec = require('child_process').execSync;
		var path = require('path');
		var currentWorkingDir = path.resolve(process.cwd());
		console.log("Executing npm run init-site in " + currentWorkingDir);

		exec('npm run init-site', {
			cwd: currentWorkingDir
		}, function(error, stdout, stderr) {
			console.log(stdout);
		});
	}

}
module.exports = SitesKicker;
