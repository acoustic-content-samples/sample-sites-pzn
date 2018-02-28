# WCH sites personalization sample

### Use case

You want your website to show a personalized navigation based on attributes of the current user. Examples of an attribute could be a brand or a user role. After a user logs in, new page links appear that are relevant to that person. Access via a direct URL to hidden pages is not restricted, but only targeted links are shown in the UI. The home page also updates to show content reflecting the current user's role or brand.

### Features

* Login:
    * Includes a mock login layout and angular component, where users can select their role on the site
    * Login status is persisted in `localStorage` until the user explicitly logs out
    * An angular login service ensures user data stay in sync between the login component and the header
    * The JSON list of user roles and associated tags can be edited in the `Login form` content item, no code change required
* Navigation:
    * The site header filters the page navigation, based on tags associated with the current user role
    * Anonymous users see pages which contain no user role tags
    * Users that are logged in see pages that are not tagged, plus pages tagged for their role
* Personalized content:
    * The home page shows personalized content, based on the user role tags
    * Anonymous users see generic information on the home page
    * Users that are logged in see extra content on the home page, which is tagged for their role
* Site:
    * Package contains a full WCH site, with editable source code based on the [Oslo sample site](https://github.com/ibm-wch/wch-site-application)
    * Header and home page display the current username with a role-based icon
    * All content, header and footer information are customizable through the WCH UI

Mock login screen:

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

1. Download the `sample-sites-pzn` zip and unpackage it into an empty directory
2. Run `npm install` in your new directory

### Configure your tenant

1. Run `wchtools init` to setup the [WCH tools CLI](https://github.com/ibm-wch/wchtools-cli#getting-started)

### Deploy the code

1. Run `wchtools delete -A --all -v` to empty your tenant. **WARNING**: _This will delete all your tenant's Content, Assets, Types, Layouts, Pages, Taxonomies and Image Profiles._ Read more [here](https://github.com/ibm-wch/wchtools-cli#deleting-all-instances-of-a-specified-artifact-type-or-all-instances-of-all-artifact-types)
2. Run `npm run init-content` to deploy all the sample pages, content and assets
3. Run `npm run build-deploy` to build and deploy the application code to your tenant

## Implementation details

### Role tags

The sample contains the follow user roles and associated tags/values:
```
[
	{
		"label":"Chef",
		"value":"wch_pzn_chef"
	},
	{
		"label":"Customer",
		"value":"wch_pzn_customer"
	},
	{
		"label":"Farmer",
		"value":"wch_pzn_farmer"
	},
	{
		"label":"Restaurateur",
		"value":"wch_pzn_restaurateur"
	}
]
```
Page content items that have these tags are shown to users with the corresponding role, chosen from a dropdown menu in the login screen. This list can be edited in the `PZN members` element of the `Login form` content item, without touching the SPA code.

### Page filtering

To get the list of pages for the navigation, an [Apache Solr search](https://developer.ibm.com/customer-engagement/docs/wch/searching-content/searching-published-items/) is performed:
```
<API URL>/delivery/v1/search?q=*:*&fl=name,id&fq=classification:content&fq=type:("Standard page" OR "Design page")&fq=((*:* AND -tags:wch_pzn_*) OR tags:(<user role tag>))
```
It looks for:
* published items
* those classified as `content`
* content of type `Standard page` or `Design page`
* items that do not have any tags prefixed with `wch_pzn_` (everybody sees these pages)
* items with a role-based tag from the JSON above (only for authenticated users)

This list of "allowed" content items (`taggedPages`) is used to filter the full list of pages (`sitePages`) (retrieved by the SDK rendering context):
```
	// the full list of pages from the RenderingContext:
	const sitePages = this.rc && this.rc.context ? this.rc.context.site.pages : [];
	// filter sitePages by what is in taggedPages (retrieved via the search URL detailed above)
	// a sitePage is rejected if there is no taggedPage with an id equal to the sitePage's contentId
	return sitePages.filter(sitePage => {
		return taggedPages.some(taggedPage => taggedPage.id === sitePage.contentId);
	});
```
Read more in `/sample-sites-pzn/src/app/wchHeader/wchHeader.component.ts`

### Personalized home page

The Home page contains a content item of the `Personalized item` type. This item performs a search to retrieve and display custom content based on the current user's role:
```
readonly TYPE: string = 'Image with information';
this.queryString = fl=document:%5Bjson%5D,lastModified&fq=classification:(content)&fq=type:("${this.TYPE}")&fq=tags:(${this.pzn_tag})&rows=1
```
It looks for:
* 1 item
* those classified as `content`
* content of type `Image with information` (note: this can be changed to any type you want, by updating the `TYPE` variable)
* an item with the current role-based tag (`pzn_tag`)

This query is fed into a special [query component](https://github.com/ibm-wch/wch-site-application/blob/master/doc/README-programming-model.md#triggering-a-search-and-showing-results-referencing-their-layouts):
```
	<div *ngIf="isLoggedIn" class="pzn-pic">
		<wch-contentquery [query]='queryString' #q>
			<wch-contentref *ngFor="let rc of q.onRenderingContexts | async" [renderingContext]="rc"></wch-contentref>
		</wch-contentquery>
	</div>
```
Read more in `/sample-sites-pzn/src/app/layouts/personalized-item/personalizedItemLayout.ts`

### Mock login

The login page is a [custom component](https://developer.ibm.com/customer-engagement/docs/wch/developing-your-own-website/customizing-sample-site/adding-custom-components/) using angular [reactive forms](https://angular.io/guide/reactive-forms). Both the login page and the header make calls to the observable authentication service, which stores the user status and data in `localStorage`. Abstracting to a shared service lets various page components share the user information. This service could be easily extended to make real authentication calls.

Read more in `/sample-sites-pzn/src/app/layouts/login/loginLayout.ts` and `/sample-sites-pzn/src/app/common/authService/auth.service.ts`

## SPA customization

You can edit this sample code to make it your own. This package is based on the Oslo Single Page Application (SPA) sample site, so the same [programming model](https://github.com/ibm-wch/wch-site-application#documentation) applies.

### Local development server

In order to run a local development server, you will need to set the tenant information by changing the values in `src/app/Constants.ts`. This information can be retrieved from the WCH user menu under "Hub information".

Run `npm start` for a development server, and navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files. 

### Build and deploy

1. Build the project with `npm run build`. Use the `-prod`flag for a production build
2. When changes to your site are ready, run `npm run deploy` to push them to your tenant
