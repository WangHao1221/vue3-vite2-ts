import { App } from 'vue'
import 'element-plus/dist/index.css'
import { ElButton, ElForm, ElMenu } from 'element-plus' //项目中用到哪些组件就往里添加就OK了

const components = [ElButton, ElForm, ElMenu]
export default function (app:App):void{
  for (const component of components) {
    app.component(component.name, component)
  }
}