import {
    RenderingContext
} from 'ibm-wch-sdk-ng';
import { Component } from '@angular/core';
import { AbstractPersonalizedItemComponent } from './abstractPersonalizedItemComponent';

/*
 * @name Personalized item
 * @id 1712ddc2-4547-4674-b9e7-821fab15061a
 */
/* TODO uncomment this if you plan to use the component standalone, i.e. not as the basis of a layout.
@Component({
  selector: 'app-type-personalized-item-component',
  templateUrl: './typePersonalizedItemComponent.html',
  styleUrls: ['./typePersonalizedItemComponent.scss'],
  preserveWhitespaces: false
})
*/
export class TypePersonalizedItemComponent extends AbstractPersonalizedItemComponent {

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
