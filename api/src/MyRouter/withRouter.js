import React from 'react';
import RouterContext from './Context'
const withRouter =(WrappedComponent)=>props=>{
    return <RouterContext.Consumer>
        {
            context =><WrappedComponent {...context} {...props} />
        }
    </RouterContext.Consumer>
     
}
export default withRouter