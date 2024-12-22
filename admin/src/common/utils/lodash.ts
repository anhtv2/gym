import _ from 'lodash'

const install = (app: any) => {
  app.config.globalProperties.$_ = _
};

export { install as default }
