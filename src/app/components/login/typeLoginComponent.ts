import {
    RenderingContext
} from 'ibm-wch-sdk-ng';
import { Component } from '@angular/core';
import { AbstractLoginComponent } from './abstractLoginComponent';

/*
 * @name Login
 * @id b0f151db-f00c-43de-b3e7-613b83d65d8b
 */
/* TODO uncomment this if you plan to use the component standalone, i.e. not as the basis of a layout.
@Component({
  selector: 'app-type-login-component',
  templateUrl: './typeLoginComponent.html',
  styleUrls: ['./typeLoginComponent.scss'],
  preserveWhitespaces: false
})
*/
export class TypeLoginComponent extends AbstractLoginComponent {

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
