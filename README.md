# Acoustic Content sites personalization sample

### Table of contents
* [Use case](#use-case)
* [Features](#features)
* [Set up](#set-up)
    * [Prerequisites](#prerequisites)
    * [Download and install](#download-and-install)
    * [Configure your tenant](#configure-your-tenant)
    * [Deploy the code](#deploy-the-code)
* [SPA customization](#spa-customization)
    * [Local development server](#local-development-server)
    * [Build and deploy](#build-and-deploy)
* [Implementation details](#implementation-details)
    * [Role tags](#role-tags)
    * [Page filtering](#page-filtering)
    * [Personalized home page](#personalized-home-page)
    * [Role-based icons](#role-based-icons)
    * [Mock login](#mock-login)
* [Integrate with an existing Oslo-based site](#integrate-with-an-existing-oslo-based-site)
    * [Download](#download)
    * [Install the Login and Personalized content components](#install-the-login-and-personalized-content-components)
    * [Integrate the authentication service](#integrate-the-authentication-service)
    * [Create your roles](#create-your-roles)
    * [Filter the header navigation](#filter-the-header-navigation)
    * [Create authentication status, Login and Logout buttons](#create-authentication-status-login-and-logout-buttons)
    * [Add the personalized content component](#add-the-personalized-content-component)
    * [Tag your content](#tag-your-content)
    * [Build and deploy your updates](#build-and-deploy-your-updates)

### Use case

You want your website to show personalized pages and content based on attributes of the current user. Examples of an attribute could be a brand or a user role. After a user logs in, new page links appear that are relevant to that person. The home page also updates to show content reflecting the current user's role or brand.

This is not a security feature. Access via a direct URL to currently hidden pages is not restricted; they are just not displayed in the header navigation.

### Features

* Login:
    * Includes a mock login layout and angular component, where users can optionally select their role on the site
    * Login status is persisted in `localStorage` until the user explicitly logs out
    * An angular authentication service ensures user data stay in sync between the login component, header and other content
    * The authentication service can be updated to use a real authentication backend, instead of `localStorage`
    * The list of brands/tags used, can be edited in the **Login form** content item, no code change required
* Navigation:
    * The site header filters the page navigation, based on tags associated with the current user role
    * Anonymous users, or those with no assigned role, see pages which contain no user role tags
    * Users that are logged in see pages that are not tagged, plus pages tagged for their role
* Personalized content:
    * The home page shows personalized content, based on the user role tags
    * Anonymous users, or those with no assigned role, see generic information on the home page
    * Users that are logged in see targeted content on the home page, which is tagged for their role
* Site:
    * Package contains a full WCH site, with editable source code based on the [Oslo sample site](https://github.com/ibm-wch/wch-site-application)
    * Header and home page display the current username with a role-based icon
    * All content, header and footer information are customizable through the WCH UI

Mock login screen with role selection enabled:

![mock login screen](doc/screenshot-login.png?raw=true "mock login screen")

Site as seen by a Farmer:

![site as seen by a Farmer](doc/screenshot-farmer.png?raw=true "site as seen by a Farmer")

Home page as seen by a Farmer:

![home page as seen by a Farmer](doc/screenshot-farmer-home.png?raw=true "home page as seen by a Farmer")

## Set up

### Prerequisites

* A WCH tenant in Trial or Standard Tier
* [wchtools-cli](https://github.com/ibm-wch/wchtools-cli) v2.1.3 or above
* Node.js v6.11.1 or above

### Download and install

1. Download the **sample-sites-pzn** zip and unpackage it into an empty directory
2. Run `npm install` in your new directory

### Configure your tenant

1. Run `wchtools init` to setup the [WCH tools CLI](https://github.com/ibm-wch/wchtools-cli#getting-started)

### Deploy the code

1. Run `wchtools delete -A --all -v` to empty your tenant. **WARNING**: _This will delete all your tenant's Content, Assets, Types, Layouts, Pages, Taxonomies and Image Profiles._ Read more [here](https://github.com/ibm-wch/wchtools-cli#deleting-all-instances-of-a-specified-artifact-type-or-all-instances-of-all-artifact-types)
2. Run `npm run init-content` to deploy all the sample pages, content and assets
3. Run `npm run build-deploy` to build and deploy the application code to your tenant

## SPA customization

You can edit this sample code to make it your own. This package is based on the Oslo Single Page Application (SPA) sample site, so the same [programming model](https://github.com/ibm-wch/wch-site-application#documentation) applies.

### Local development server

1. Set the tenant information by changing the values in _src/app/Constants.ts_. This information can be retrieved from the WCH user menu under "Hub information".
2. Go to **Hub set up -> General settings -> Security** and set your trusted domains (or `*`)
3. Run `npm start` for a development server, and navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files. 

### Build and deploy

1. Build the project with `npm run build`. Use the `-prod`flag for a production build
2. When changes to your site are ready, run `npm run deploy` to push them to your tenant

## Implementation details

### Role tags

**Login form** content item:

![Login form content item](doc/screenshot-login-form.png?raw=true "Login form content item")

The sample shows personalized pages and content to users logged in under certain roles. The personalized items are mapped to the user roles by tagging the associated content. The tags used are controlled by JSON objects stored in the **Login form** content item. They can be updated in WCH without touching the SPA code. There are two ways to map users to role tags:

1. The **PZN user tags** JSON explicitly associates user IDs with roles. The sample contains this data:
```
[
	{
		"user":"chef@ibm.com",
		"tag":"wch_pzn_chef"
	},
	{
		"user":"customer@ibm.com",
		"tag":"wch_pzn_customer"
	},
	{
		"user":"farmer@ibm.com",
		"tag":"wch_pzn_farmer"
	},
	{
		"user":"restaurateur@ibm.com",
		"tag":"wch_pzn_restaurateur"
	},
	{
		"user":"chef2@ibm.com",
		"tag":"wch_pzn_chef"
	},
	{
		"user":"customer2@ibm.com",
		"tag":"wch_pzn_customer"
	},
	{
		"user":"farmer2@ibm.com",
		"tag":"wch_pzn_farmer"
	},
	{
		"user":"restaurateur2@ibm.com",
		"tag":"wch_pzn_restaurateur"
	}
]
```

2. With **Render role tags list** mode on, users choose from a list of available roles upon login. The **PZN role tags** JSON contains the follow user roles and associated tags:
```
[
	{
		"role":"Chef",
		"tag":"wch_pzn_chef"
	},
	{
		"role":"Customer",
		"tag":"wch_pzn_customer"
	},
	{
		"role":"Farmer",
		"tag":"wch_pzn_farmer"
	},
	{
		"role":"Restaurateur",
		"tag":"wch_pzn_restaurateur"
	}
]
```

### Page filtering

To get the list of pages for the navigation, an Apache Solr search is performed:
```
<API URL>/delivery/v1/search?q=*:*&fl=name,id&fq=classification:content&fq=type:("Standard page" OR "Design page")&fq=((*:* AND -tags:wch_pzn_*) OR tags:(<user role tag>))
```
It looks for:
* published items
* those classified as **content**
* content of type **Standard page** or **Design page**
* items that do not have any tags prefixed with `wch_pzn_` (everybody sees these pages)
* items with a role-based tag from the JSON above (only for authenticated users)

This list of "allowed" content items (`taggedPages`) is used to filter the full list of pages (`sitePages`) (retrieved by the SDK rendering context):
```
	// the full list of pages from the RenderingContext:
	const sitePages = this.rc && this.rc.context ? this.rc.context.site.pages : [];
	// filter sitePages by what is in taggedPages (retrieved via the search URL detailed above)
	// a sitePage is rejected if there is not a taggedPage with an id that matches the sitePage's contentId
	return sitePages.filter(sitePage => {
		return taggedPages.some(taggedPage => taggedPage.id === sitePage.contentId);
	});
```
See more in _/sample-sites-pzn/src/app/wchHeader/wchHeader.component.ts_

### Personalized home page

The Home page contains a content item of the **Personalized content** type. This item performs a search to retrieve and display custom content based on the current user's role (or an un-tagged item if there is no role):
```
readonly TYPE: string = 'Image with information';
const pznTagQuery = this.pzn_tag ? `OR tags:(${this.pzn_tag}))` : ')';
this.queryString = `fl=document:%5Bjson%5D,lastModified&fq=classification:(content)&fq=type:("${this.TYPE}")&fq=((*:* AND -tags:wch_pzn_*)${pznTagQuery}&rows=1`;
```
It looks for:
* 1 item
* those classified as **content**
* content of type **Image with information** (note: this can be changed to any type you want, by updating the `TYPE` variable)
* an item with the current role-based tag (`this.pzn_tag`)

This query is fed into a special [query component](https://github.com/ibm-wch/wch-site-application/blob/master/doc/README-programming-model.md#triggering-a-search-and-showing-results-referencing-their-layouts):
```
	<div *ngIf="isLoggedIn" class="pzn-pic">
		<wch-contentquery [query]='queryString' #q>
			<wch-contentref *ngFor="let rc of q.onRenderingContexts | async" [renderingContext]="rc"></wch-contentref>
		</wch-contentquery>
	</div>
```
See more in _/sample-sites-pzn/src/app/layouts/personalized-content/personalizedContentLayout.ts_

### Role-based icons

The header and home page both contain icons that are different for each user role. These are simple [font-based icons](https://material.io/icons/), which update via CSS:
```
/* custom role-based logos */
.wch_pzn_chef .logo.pzn-icon i:before {
	content: "restaurant_menu";
}
.wch_pzn_customer .logo.pzn-icon i:before {
	content: "face";
}
.wch_pzn_farmer .logo.pzn-icon i:before {
	content: "spa";
}
.wch_pzn_restaurateur .logo.pzn-icon i:before {
	content: "lightbulb_outline";
}
.NO_ROLE .logo.pzn-icon i:before {
	content: "account_circle";
}
```
The content of the icon DOM node switches based on the current role tag, which is added as a CSS class on any parent element. The `NO_ROLE` fallback is assigned if the user is anonymous or does not have a role.

See more in _/sample-sites-pzn/src/app/app.scss_

### Mock login

The login page is a custom component using angular [reactive forms](https://angular.io/guide/reactive-forms). Both the login page and the header make calls to the observable authentication service, which stores the user status and data in `localStorage`. Abstracting to a shared service lets various page components share the user information. This service could then easily be extended to make real authentication calls to your own back-end services.

Read more in _/sample-sites-pzn/src/app/layouts/login/loginLayout.ts_ and _/sample-sites-pzn/src/app/common/authService/auth.service.ts_

## Integrate with an existing Oslo-based site

If you already have a site based on the [Oslo sample](https://github.com/ibm-wch/wch-site-application), you can manually include these personalization features. 

### Download

1. Download the **sample-sites-pzn** zip and unpackage it into an empty directory

### Install the Login and Personalized content components

1. Unpackage _/sample-sites-pzn/scripts/osloPackage.zip_ into _[root directory of your site]/osloPackage_
2. Run `npm run install-layouts-from-folder osloPackage`
3. Run `wchtools push -A -v --dir osloPackage/content-artifacts`

### Integrate the authentication service

1. Copy _/sample-sites-pzn/src/app/common/authService/_ into _[root directory of your site]/src/app/common/_
2. Register the authService in _[root directory of your site]/src/app/app.module.ts_:
```
import { AuthService } from './common/authService/auth.service';
//...
	providers: [
		//...
		AuthService
	]
```
3. Integrate the `ReactiveFormsModule` module from angular in _[root directory of your site]/src/app/app.module.ts_:
```
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
	imports: [
		//...
		FormsModule,
		ReactiveFormsModule,
		//...
	]
```

### Create your roles

1. In WCH, go to **All content and assets -> Login form**
2. Create a draft and edit the available roles with one of the 2 following options:
	* Update the **PZN user tags** JSON to associated usernames (ie: `user`) with tags (ie: `tag`). Example:
`[{"user":"decor@ibm.com","tag":"wch_pzn_living"},{"user":"chef@ibm.com","tag":"wch_pzn_dining"},{"user":"relaxing@ibm.com","tag":"wch_pzn_sleeping"}]`

	* Turn on the **Render role tags list** toggle, and update the **PZN role tags** JSON to define your roles/brands (ie: `role`) and their associated tags (ie: `tag`). Example:
`[{"role":"Living","tag":"wch_pzn_living"},{"role":"Dining","tag":"wch_pzn_dining"},{"role":"Sleeping","tag":"wch_pzn_sleeping"}]`

**Note**: Use the `wch_pzn_` prefix, otherwise you will need to update the search query for pages in a later step.

3. Optionally change the **Title** and **Message** displayed on the login screen
4. Publish your changes

### Filter the header navigation

1. Open _[root directory of your site]/src/app/responsiveHeader/responsive-header.html_ for editing
2. Replace `rc?.context?.site.pages` with `this.pages`
3. Open _[root directory of your site]/src/app/responsiveHeader/responsiveHeader.component.ts_ for editing
4. Import the services and constants:
```
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../common/authService/auth.service';
import {environment} from '../environment/environment';
//...
	constructor(configService: ConfigServiceService, private authService: AuthService, private http: HttpClient, private router: Router) {
```
5. Add these variables to the `ResponsiveHeaderComponent` class:
```
	authSub: Subscription;
	loading: boolean = false;
	isLoggedIn: boolean = false;
	username: string = '';
	pzn_tag: string = '';
```
6. Replace the ngOnDestroy function with the following to unsubscribe from the authentication service:
```
	ngOnDestroy() {
		this.configSub.unsubscribe();
		this.authSub.unsubscribe();
	}
```
7. Replace the `set renderingContext` function with:
```
	public set renderingContext(aValue: RenderingContext) {
		if(aValue) {
			if(this._hasPagesChanged(aValue.context.site.pages)){
				this.refreshPages();
			}
		}
		this.rc = aValue;
		this.cachedChildren = new Map<string, any[]>();
	}
```
8. Replace the `_hasPagesChanged` function with:
```
	_hasPagesChanged(newPages){
		let current = newPages || [];
		let previous = this.rc && this.rc.context ? this.rc.context.site.pages : [];

		return (JSON.stringify(current) != JSON.stringify(previous));
	}
```
9. Add these functions to subscribe to authentication changes and filter the page navigation list whenever a user logs in or out:
```
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

	logout() {
		this.authService.logout();
		this.router.navigate(['home']);
	}

	refreshPages() {
		const pznTagQuery = this.pzn_tag ? `OR tags:(${this.pzn_tag}))` : ')';
		const pageSearchUrl = `${environment.apiUrl}/delivery/v1/search?q=*:*&fl=name,id&fq=classification:content&fq=type:("Standard page" OR "Design page")&fq=((*:* AND -tags:wch_pzn_*)${pznTagQuery}`;

		this.loading = true;
		this.http.get<any>(pageSearchUrl).subscribe(pageDocs => {
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
		sitePages = sitePages ? sitePages : this.rc && this.rc.context ? JSON.parse(JSON.stringify(this.rc.context.site.pages)) : [];
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
```
10. Open _[root directory of your site]/src/app/responsiveHeader/wch-menu-item/wchMenuItem.component.ts_ for editing
11. Remove child page caching in the `getVisibleChildren` function, so pages in the drop-down menus can be updated when a user logs in or out:
```
	getVisibleChildren(page): any[] {
		let visibleChildren = page.children.filter((child) => {
			return !child.hideFromNavigation;
		});
		return visibleChildren
	}
```

### Create authentication status, Login and Logout buttons

1. Open _[root directory of your site]/src/app/responsiveHeader/responsive-header.html_ for editing
2. Add the username, login and logout links:
```
	<span *ngIf="isLoggedIn">{{username}} ::</span>
	<a *ngIf="!isLoggedIn" style="color:#555;text-decoration:underline;" [routerLink]="['login']">Login</a>
	<a *ngIf="isLoggedIn" style="color:#555;text-decoration:underline;" href="javascript:;" (click)="logout()">Logout</a>
```
3. Re-style as necessary to match your site

### Add the personalized content component

1. In WCH, go to **All content and assets -> Personalized content**
2. Create a draft, then edit or delete the **Title** and **Message** elements. These pieces of text are shown to all users, anonymous or logged in.
3. Go to **Website -> Site manager**
4. Pick a page on which to place the personalized component, go to **menu -> Edit content** and click **Create draft**
5. Add the **Personalized content** to the page and publish your changes
6. Open _[root directory of your site]/src/app/app.scss_ and add styles to display a custom icon for each role/brand. This example just uses initials, but you can easily replace these with strings from a font-based icon set (eg: [Material icons](https://material.io/icons/)):
```
/* custom role-based logos */
.wch_pzn_living .logo.pzn-icon i:before {
	content: "L";
}
.wch_pzn_dining .logo.pzn-icon i:before {
	content: "D";
}
.wch_pzn_sleeping .logo.pzn-icon i:before {
	content: "S";
}
.NO_ROLE .logo.pzn-icon i:before {
	content: "?";
}
```

**Note**: This component queries items of content type **Image with information**. You can change this by updating the `TYPE` variable in _[root directory of your site]/src/app/layouts/personalized-content/personalizedContentLayout.ts_. For example:
```
readonly TYPE: string = 'Lead image with information';
```

### Tag your content

1. In WCH, go to **All content and assets**
2. Add one or more `wch_pzn_*` tags defined in the [Create your roles](#create-your-roles) section to some of your pages
3. Tag one content item of type **Image with information** (unless you've changed this in _personalizedContentLayout.ts_) for each role. We tag 1 item for each role because the **Personalized content** displays one piece of content.

**Note**: Remember that any tagged item will now _only_ show up for logged in users with the associated role or brand.

### Build and deploy your updates

1. Run `npm run build-deploy`
