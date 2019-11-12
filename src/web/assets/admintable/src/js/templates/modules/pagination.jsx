// eslint-disable-next-line
export function pag(h) {

    return (theme) => {

        if (this.opts.pagination && this.opts.pagination.dropdown) return '';

        let options = {
            theme:theme,
            chunk:this.opts.pagination.chunk,
            chunksNavigation:this.opts.pagination.nav,
            edgeNavigation:this.opts.pagination.edge,
            texts:{
                count:'asd',
                last:'asdsa',
                nextPage: 'Next Page',
                nextChunk: 'asd',
                first: 'asd'
            }
        };

        let name = this.vuex?this.name:this.id;

        return <pagination
            ref="pagination"
            options={options}
            for={name}
            vuex={this.vuex}
            records={this.count}
            per-page={parseInt(this.limit)}
            onPaginate={this._onPagination.bind(this)}>
        </pagination>

    }

}