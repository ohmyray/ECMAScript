class MyArray {

    /**
     * 查找 arr 中是否有 val， 若有返回 true 否者 false
     * @param {arr} 数组
     * @param {val} 回调函数
     * @returns { boolean }
     */
    contains(arr, val) {
        return arr.indexOf(val) != -1 ? true : false;
    }

    /**
     * 传入一个 array 利用slice.call 利用 arguments 添加元素 返回给函数，
     * 用 apply 将数组添加到另一个数组
     * concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
     * 遍历出每一个元素，以便于下个函数使用
     * @param {arr} 数组
     * @param {fn} 回调函数
     */
    each(arr, fn) {
        fn = fn || Function;
        var a = [];
        var args = Array.prototype.slice.call(arguments, 1);
        for (let i = 0; i < arr.length; i++) {
            let res = fn.apply(arr, [arr[i], i].concat(args));
            if (res != null) a.push(res)
        }
    }

    /**
     * 利用回调函数返回每一个元素，及其所在数组的索引下标
     * @param {arr} 数组
     * @param {fn} 回调函数
     * @param {thisObj} this指向
     * @returns {[]}
     */
    map(arr, fn, thisObj) {
        let scope = thisObj || window;
        let a = [];
        for (let i = 0; i < arr.length; i++) {
            let res = fn.call(scope, arr[i], i, this);
            if (res != null) a.push(res)
        }
        return a;
    }

    /**
     * 数组排序
     * @param { arr } 数组
     * @param { number } 1:从小到大  2：从大到小  3：随机
     * @returns { Array } 新数组
     */
    sort(arr, type = 1) {
        return arr.sort((a, b) => {
            switch (type) {
                case  1:
                    return a - b;
                case  2:
                    return b - a;
                case  3:
                    return Math.random() - 0.5;
                default:
                    return arr;
            }
        })
    }

    /**
     * 数组去重
     * @param { arr }
     * @returns { Array }
     */
    unique(arr) {
        if (Array.hasOwnProperty('from')) {
            return Array.from(new Set(arr));
        } else {
            let n = {},
                r = [];
            for (let i = 0; i < arr.length; i++) {
                if (!n[arr[i]]) {
                    n[arr[i]] = true;
                    r.push(arr[i]);
                }
            }
            return r;
        }
    }

    /**
     * 求俩个集合的并集
     * @param {Array} a
     * @param {Array} b
     * @returns {Array} newArr
     */
    union(a, b) {
        let newArr = a.concat(b);
        return this.unique(newArr);
    }

    /**
     * 求两个集合的交集
     * @param {Array} a
     * @param {Array} b
     * @returns {*[]} newArr
     */
    intersect(a, b) {
        let _this = this;
        a = this.unique(a);
        return this.map(a, function (o) {
            return _this.contains(b, o) ? o : null;
        });
    }

    /**
     * 删除 arr 中一个 ele 并返回
     * @param arr 数组
     * @param ele 元素
     * @returns {arr} arr
     */
    remove(arr, ele) {
        let index = arr.indexOf(ele);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    /**
     * 将类数组元素转换
     * @param ary
     * @returns {*}
     */
    formArray(ary) {
        let arr = [];
        if (Array.isArray(ary)) {
            arr = ary;
        } else {
            arr = Array.prototype.slice.call(ary);
        }
        ;
        return arr;
    }

    /**
     * 求数组中最大值
     * @param arr
     * @returns {number}
     */
    max(arr) {
        return Math.max.apply(null, arr);
    }

    /**
     * 求数组中最小值
     * @param arr
     * @returns {number}
     */
    min(arr) {
        return Math.min.apply(null, arr)
    }

    /**
     * 求数组的和
     * @param arr
     * @returns {*}
     */
    sum(arr) {
        return arr.reduce((pre, cur) => {
            return pre + cur
        })
    }

    /**
     * 求数组平均值
     * @param arr
     * @returns {number}
     */
    average(arr) {
        return this.sum(arr) / arr.length
    }

}

