// import { IWidget } from 'dynamic-adapter.dapplet-base.eth';

export interface IResultState {
    hidden: boolean;
    img: string;
    title: string;
    views: string;
    date: string;
    channelIcon?: string;
    channel: string;
    description: string;
    disabled: boolean;
    badges: { color: string; tooltip: string; label: string, basic: boolean }[];
    exec: (ctx: any, me: IResultState) => void;
    init: (ctx: any, me: IResultState) => void;
    ctx: any;
    insPointName: string;
    theme: "DARK" | "LIGHT";
}

export class Result {
    public el: HTMLElement;
    public state: IResultState;
    insPointName: string;

    public static contextInsPoints = {
        SEARCH_RESULT_GROUP: 'SEARCH_RESULTS'
    }

    public mount() {
        if (!this.el) this._createElement();

        const { img, title, hidden, views, date, channelIcon, channel, description, badges, theme } = this.state;

        if (hidden) {
            this.el.innerHTML = '';
            return;
        } else {
            this.el.innerHTML = `
                <div style="display: flex; cursor: pointer; margin-top: 16px;">
                    <img style="display: block; margin-right: 16px; min-width: 360px; width: 360px; height: 202px; object-fit: contain; background: #000;" src="${img}" />
                    <div style="flex: auto;">
                        <div style="font-size: 18px; font-weight: 400; line-height: 24px; ${(theme === "DARK") ? "color: #fff;" : 'color: #000;'}">${title}</div>
                        <div style="font-size: 13px; font-weight: 400; line-height: 18px; ${(theme === "DARK") ? "color: #aaa;" : 'color: rgb(96, 96, 96);'}">${(views) ? `${views} views · ` : ''}${date}</div>
                        <div style="font-size: 13px; font-weight: 400; ${(theme === "DARK") ? "color: #aaa;" : 'color: rgb(96, 96, 96);'} margin: 10px 0; display: flex;">
                            ${(channelIcon) ? `<img style="border-radius: 12px; width: 24px; height: 24px; object-fit: cover; margin-right: 8px;" src="${channelIcon}" alt="${channel}" width="24" height="24" />` : ''}
                            <div style="line-height: 24px;">${channel}</div>
                        </div>
                        <div style="font-size: 13px; font-weight: 400; line-height: 18px; ${(theme === "DARK") ? "color: #aaa;" : 'color: rgb(96, 96, 96);'}">${description}</div>
                        <div style="margin-top: 10px;">
                            ${(badges) ? (badges.map(x => (`<div 
                                style="
                                    ${(!x.basic) ? `background-color: ${x.color};` : ''}
                                    padding: 3px 4px;
                                    font-size: 12px;
                                    font-weight: 500;
                                    border-radius: 2px;
                                    font-family: Roboto, Arial, sans-serif;
                                    line-height: 12px;
                                    ${(x.basic) ? (`color: ${x.color ?? 'color: rgb(96,96,96)'};`) : 'color: rgb(96,96,96);'}
                                    margin-right: 4px;
                                    float: left;
                                "
                                ${(x.tooltip) ? `title="${x.tooltip}"` : ''}
                            >${x.label}</div>`)).join('')) : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    public unmount() {
        this.el && this.el.remove();
    }

    private _createElement() {
        this.el = document.createElement('div');
        this.el.addEventListener("click", e => {
            if (!this.state.disabled) {
                this.state.exec?.(this.state.ctx, this.state);
            }
        });
        this.mount();
        this.state.init?.(this.state.ctx, this.state);
    }
}