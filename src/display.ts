import * as $ from 'jquery';

export class Display
{
    private content: HTMLElement;
    protected canvas: HTMLCanvasElement;

    public constructor (content: HTMLElement)
    {
        this.content = content;
        this.canvas = $('<canvas>')[0] as HTMLCanvasElement;
    }

    protected delay(ms: number): Promise<number>
    {
      return new Promise<number> (resolve => setTimeout(resolve, ms));
    }
    
    protected async render ()
    {
        await this.delay (15000);
    }

    public async run ()
    {
        while (true)
        {
            let wait = Math.random () * 60000;
            await this.delay (wait);
            let cont = $(this.content);
            await this.flickerEffect(cont);
            cont.replaceWith (this.canvas);
            await this.render ();
            $(this.canvas).replaceWith (this.content);
        }
    }

    private async flickerEffect(cont: JQuery<HTMLElement>) {
        await this.flicker(cont, 'slow', 1500);
        await this.flicker(cont, 'medium', 1000);
        await this.flicker(cont, 'fast', 500);
    }

    private async flicker(cont: JQuery<HTMLElement>, cls: string, ms: number) 
    {
        var cssClass = 'flicker-' + cls
        cont.toggleClass(cssClass);
        await this.delay(ms);
        cont.toggleClass(cssClass);
    }
}