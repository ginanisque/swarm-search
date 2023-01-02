import { IFeature } from '@dapplets/dapplet-extension';
import { Button } from './button';

@Injectable
export default class SocialArchiveAdapter {
  private _currentInput: HTMLInputElement = null;

  public exports = () => ({
    button: this.adapter.createWidgetFactory(Button)
  });

  public config = {
    UPLOADED_FILE: {
      containerSelector: '.main-container > .container .archive-pending-label',
      insPoints: {
        BUTTONS: {
          selector: "form",
          insert: 'inside'
        },
      },
      contextBuilder: (node) => {
        const link = node.querySelector('.archive-pending-action > .btn-row a.link-button');
        return link ? ({
          id: link.href,
          url: link.href,
          reference: /[0-9a-fA-F]{64}/gm.exec(link.innerText)[0],
          file: this._currentInput.files[0]
        }) : null
      },
    },
    ATTACHED_FILE: {
      containerSelector: '#masr93',
      contextSelector: 'input:not([directory])',
      contextBuilder: (node) => {
        this._currentInput = node;
        return ({
          id: 'file'
        });
      },
    }
  }

  constructor(
    @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any,
  ) {
    this.adapter.configure(this.config);
  }

  public attachConfig(feature: IFeature): void {
    return this.adapter.attachConfig(feature);
  }

  public detachConfig(feature: IFeature): void {
    this.adapter.detachConfig(feature);
  }
}
