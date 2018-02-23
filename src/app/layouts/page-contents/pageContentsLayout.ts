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
import { LayoutComponent, RenderingContext } from 'ibm-wch-sdk-ng';
import { Component, OnInit } from '@angular/core';
import { TypePageContentsComponent } from './../../components/page-contents/typePageContentsComponent';

/*
 * @name pageContentsLayout
 * @id page-contents-layout
 */
@LayoutComponent({
    selector: 'page-contents-layout'
})
@Component({
  selector: 'app-page-contents-layout-component',
  templateUrl: './pageContentsLayout.html',
  styleUrls: ['./pageContentsLayout.scss'],
  preserveWhitespaces: false
})

export class PageContentsLayoutComponent extends TypePageContentsComponent implements OnInit {

	rContext: RenderingContext;

    constructor() {
        super();
    }

	ngOnInit() {
		super.ngOnInit();

		this.safeSubscribe(this.onRenderingContext, (renderingContext) => {
			this.rContext = renderingContext;
		})
	}

}
