import {
    RenderingContext
} from 'ibm-wch-sdk-ng';
import { Component } from '@angular/core';
import { AbstractPageContentsComponent } from './abstractPageContentsComponent';

/*
 * @name Page contents
 * @id 24490027-e55b-4739-a5a9-5c091c5d4a72
 */
/* TODO uncomment this if you plan to use the component standalone, i.e. not as the basis of a layout.
@Component({
  selector: 'app-type-page-contents-component',
  templateUrl: './typePageContentsComponent.html',
  styleUrls: ['./typePageContentsComponent.scss'],
  preserveWhitespaces: false
})
*/
export class TypePageContentsComponent extends AbstractPageContentsComponent {

    /*
     * TODO add custom fields here. These fields should be those
     * common to all layouts.
     */

    constructor() {
        super();
        /*
         * TODO initialize your custom fields here, note that
         * you can refer to the values bound via @RenderingContextBinding from
         * your super class.
         *
         * Make sure to call 'this.safeSubscribe' if you plan to subscribe to observables
         */
    }

}
