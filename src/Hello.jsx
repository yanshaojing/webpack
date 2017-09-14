import React from 'react'
import scss from './style.scss'
import less from './style.less'
import './style.css'

const Hello = () => (
  <div className="less scss css">
    <h1>Hello React.</h1>
    <p className={less.text}>这里是描述</p>
    <p className={scss.text}>这里是描述</p>
    <p className="text">这里是描述</p>
  </div>
)

export default Hello
