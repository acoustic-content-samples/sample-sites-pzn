/*
 * Do not modify this file, it will be auto-generated.
 */
import {
    Image,
    RenderingContextBinding,
    AbstractRenderingComponent
} from 'ibm-wch-sdk-ng';
import {
    Observable
} from 'rxjs/Observable';

/*
 * @name Page contents
 * @id 24490027-e55b-4739-a5a9-5c091c5d4a72
 */
export abstract class AbstractPageContentsComponent extends AbstractRenderingComponent {

    /*
     * {
     *   "displayType": "singleLine",
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
     *   "displayHeight": 10,
     *   "displayType": "multiLine",
     *   "displayWidth": 100,
     *   "elementType": "text",
     *   "key": "body",
     *   "label": "Body"
     * }
     */
    @RenderingContextBinding('text.body', '')
    readonly onBody: Observable<string>;

    /*
     * @see #onBody
     */
    @RenderingContextBinding()
    readonly body: string;

    /*
     * {
     *   "acceptType": [
     *     "jpg",
     *     "jpeg",
     *     "png",
     *     "gif"
     *   ],
     *   "elementType": "image",
     *   "imageProfileId": "bd89571a-edc0-4f8b-b90a-ada4c8436a39",
     *   "key": "image",
     *   "label": "Image"
     * }
     */
    @RenderingContextBinding('image.image')
    readonly onImage: Observable<Image>;

    /*
     * @see #onImage
     */
    @RenderingContextBinding()
    readonly image: Image;

    protected constructor() {
        super();
    }
}
