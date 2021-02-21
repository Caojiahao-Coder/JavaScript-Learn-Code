# DOM 节点操作

## 利用DOM提供的方法获取元素
 - document.getElementById();
 - document.getElementsByTagName();
 - document.querySelector 等
 - 逻辑性不强、繁琐


## 利用节点层级关系获取元素
 - 利用父子兄节点关系获取元素

## 节点概述
一般的，节点至少拥有nodeType(节点类型)、nodeName(节点名称)和nodeValue(节点值)这三个基本属性。
 - 元素节点nodeType为1
 - 属性节点nodeType为2
 - 文本节点nodeType为3 （文本节点包含文字、空格、换行等）。