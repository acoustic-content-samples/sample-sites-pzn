/*
 * Do not modify this file, it will be auto-generated.
 */
import {
    RenderingContextBinding,
    AbstractRenderingComponent
} from 'ibm-wch-sdk-ng';
import {
    Observable
} from 'rxjs/Observable';

/*
 * @name Personalized item
 * @id 1712ddc2-4547-4674-b9e7-821fab15061a
 */
export abstract class AbstractPersonalizedItemComponent extends AbstractRenderingComponent {

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
     *   "elementType": "formattedtext",
     *   "key": "message",
     *   "label": "Message"
     * }
     */
    @RenderingContextBinding('formattedtext.message', '')
    readonly onMessage: Observable<string>;

    /*
     * @see #onMessage
     */
    @RenderingContextBinding()
    readonly message: string;

    protected constructor() {
        super();
    }
}
