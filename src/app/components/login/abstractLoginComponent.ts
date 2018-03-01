/*
 * Do not modify this file, it will be auto-generated.
 */
import {
    RenderingContext,
    RenderingContextBinding,
    AbstractRenderingComponent
} from 'ibm-wch-sdk-ng';
import {
    Observable
} from 'rxjs/Observable';

/*
 * @name Login
 * @id b0f151db-f00c-43de-b3e7-613b83d65d8b
 */
export abstract class AbstractLoginComponent extends AbstractRenderingComponent {

    /*
     * {
     *   "elementType": "text",
     *   "key": "title",
     *   "label": "Title"
     * }
     */
    @RenderingContextBinding('text.title', '')
    readonly onTitle: Observable<string>;

    /*
     * @see #onTitle
     */
    @RenderingContextBinding()
    readonly title: string;

    /*
     * {
     *   "elementType": "text",
     *   "key": "pznRoleTags",
     *   "label": "PZN role tags"
     * }
     */
    @RenderingContextBinding('text.pznRoleTags', '')
    readonly onPznRoleTags: Observable<string>;

    /*
     * @see #onPznRoleTags
     */
    @RenderingContextBinding()
    readonly pznRoleTags: string;

    protected constructor() {
        super();
    }
}
