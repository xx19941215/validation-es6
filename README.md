validator-es6 
============
使用E6S编写的一个类似laravel的js验证模块.

## 安装

  ```shell
  $ npm install validator-es6
  ```

## 基本用法
```javascript
import {
    Validator
} from 'validator-es6';

let rules = {
  username: 'required|min:5',
  password: 'required|confirmed|min:6|max:16',
}

let data = {
  username: 'test',
  password: '123456',
}

let v = new Validator(data, rules);

if (v.fails()) {
    console.log(v.messages());
}
```

### 定义验证规则
  - "|" 分隔的字符串形式
  ```javascript
  var rules = {
    username: 'required|min:5',
    password: 'required|confirmed|min:6|max:16',
    email: 'email'
  }
  ```

  - 数组形式
  ```javascript
  var rules = {
    username: ['required', 'min:5'],
    password: ['required', ['confirmed'], ['min:6'], ['max:16'],
    email: ['required', 'email']
  }
  ```

### 其他
 - 自定义错误消息、属性别名、验证函数
   > 在消息字符串用使用`:attribute` 作为属性名占位符。
    ```javascript
    //错误消息
    let customMessages = {
        accepted: ":attribute 必须接受",
    };

    //属性别名
    let attribute = {
        "item": "条款"
    }

    //使用回调函数定义错误消息
    let replacers = {
        accepted: function (message, attribute, rule,parameters) {
            return message;
        }
    },

    let v = new Validator(data, rules, customMessages, attribute, replacers);

    //注册自定义验证函数
    v.register('upper', (attribute, value, parameters) => {
        return value.toUpperCase() == "NAME";
    }, ":attribute = :value 不对");

    if (v.fails()) {
        console.log(v.messages());
    }

    ```


# License

MIT