const fs = require('fs');

class Storage {
    constructor(path) {
        this.path = path;

        let dataString;
        if (fs.existsSync(path)) {
            dataString = fs.readFileSync(path, 'utf-8')
        } else {
            fs.writeFileSync(path, '', 'utf-8')
        }
        this.dataList = (dataString && JSON.parse(dataString)) || [];
    }

    list() {
        return JSON.parse(JSON.stringify(this.dataList))
    }

    updateOrAdd(widget) {
        try {
            const data = this.dataList.find(s => s.DashboardName === widget.DashboardName && s.Name === widget.Name)
            if (data) {
                Object.assign(data, widget)
                return;
            }
            this.dataList.push({ ...widget });
        } finally {
            this._fs_sync();

        }
    }

    del(name) {
        try {
            const index = this.dataList.findIndex(s => s.Name === name)
            this.dataList.splice(index, 1)
        } finally {
            this._fs_sync();

        }
    }

    _fs_sync() {
        fs.writeFileSync(this.path, JSON.stringify(this.dataList), 'utf-8')
    }

}

module.exports = Storage;