var debounce = require('debounce');

export function normalFilter(h) {

    return (classes, id) => {
        var search = this.source=='client'?
            this.search.bind(this, this.data):
            this.serverSearch.bind(this);

        return <div class="flex-grow texticon search icon clearable">
            <input
                class="text fullwidth"
                type="text"
                autoComplete="off"
                placeholder={this.opts.filterPlaceholder}
                value={this.query}
                on-keyup={this.opts.debounce?debounce(search, this.opts.debounce):search}
                id={id}
            />
            <div class="clear hidden" title="Clear"></div>
        </div>

    }

}