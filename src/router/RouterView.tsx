import React, { ComponentType } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
interface ICom {
    path: string,
    redirect?: string,
    component?: ComponentType,
    children?: ICom,
    isHoldup?: boolean
}
interface IProps {
    routes: Array<ICom>
}
function RouterView(props: IProps) {
    let coms = props.routes.filter(item => item.component);
    let reds = props.routes.filter(item => item.redirect);
    return <Switch>
        {
            coms.map((item, index) => {
                return <Route path={item.path} key={index} render={(routeProps) => {
                    let Com: ComponentType | any = item.component
                    if (item.isHoldup) {
                        return localStorage.getItem('token')
                            ?
                            item.children
                                ?
                                <Com  {...routeProps} routes={item.children} />
                                :
                                <Com {...routeProps} />
                            :
                            <Redirect to={
                                {
                                    pathname: '/login',
                                    state: {
                                        path: item.path
                                    }
                                }
                            } />
                    } else {
                        if (item.children) {
                            return <Com  {...routeProps} routes={item.children} />
                        } else {
                            return <Com {...routeProps} />
                        }
                    }
                }} />
            })
        }
        {
            reds.map((item, index) => {
                return <Redirect to={item.redirect as string} key={index} />
            })
        }
    </Switch>
}
export default RouterView;