(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{32:function(e,t,a){e.exports=a(61)},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(16),l=a.n(r),o=a(4),s=a(13),i=(a(37),a(8)),p=a(9),u=a(11),m=a(10),d=a(12),h=a(6),E=a.n(h),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={products:[]},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/products").then((function(t){e.setState({products:t.data}),console.log(e.state.products)}))}},{key:"render",value:function(){return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"panel panel-default"},c.a.createElement("div",{class:"panel-heading"},c.a.createElement("h3",{class:"panel-title"},"PRODUCTS LIST")),c.a.createElement("div",{class:"panel-body"},c.a.createElement("h4",null,c.a.createElement(o.b,{to:"/create"},c.a.createElement("span",{class:"glyphicon glyphicon-plus-sign","aria-hidden":"true"})," Add Product")),c.a.createElement("table",{class:"table table-stripe"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Name"),c.a.createElement("th",null,"Description"))),c.a.createElement("tbody",null,this.state.products.map((function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement(o.b,{to:"/show/".concat(e.id)},e.name)),c.a.createElement("td",null,e.shortDescription))})))))))}}]),t}(n.Component),g=(a(60),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).onChange=function(e){var t=a.state.product;t[e.target.name]=e.target.value,a.setState({product:t})},a.onSubmit=function(e){e.preventDefault();var t=a.state.product,n=t.name,c=t.shortDescription,r=t.longDescription;E.a.put("/products/"+a.props.match.params.id,{name:n,shortDescription:c,longDescription:r}).then((function(e){a.props.history.push("/show/"+a.props.match.params.id)}))},a.state={product:{}},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/products/"+this.props.match.params.id).then((function(t){e.setState({product:t.data}),console.log(e.state.product)}))}},{key:"render",value:function(){return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"panel panel-default"},c.a.createElement("div",{class:"panel-heading"},c.a.createElement("h3",{class:"panel-title"},"EDIT Product")),c.a.createElement("div",{class:"panel-body"},c.a.createElement("h4",null,c.a.createElement(o.b,{to:"/show/".concat(this.state.product.id)},c.a.createElement("span",{class:"glyphicon glyphicon-eye-open","aria-hidden":"true"})," Product List")),c.a.createElement("form",{onSubmit:this.onSubmit},c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"name"},"Name:"),c.a.createElement("input",{type:"text",class:"form-control",name:"name",value:this.state.product.name,onChange:this.onChange,placeholder:"Name"})),c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"title"},"ShortDescription:"),c.a.createElement("input",{type:"text",class:"form-control",name:"shortDescription",value:this.state.product.shortDescription,onChange:this.onChange,placeholder:"ShortDescription"})),c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"author"},"LongDescription:"),c.a.createElement("input",{type:"text",class:"form-control",name:"longDescription",value:this.state.product.longDescription,onChange:this.onChange,placeholder:"LongDescription"})),c.a.createElement("button",{type:"submit",class:"btn btn-default"},"Update")))))}}]),t}(n.Component)),f=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).onChange=function(t){var a=e.state;a[t.target.name]=t.target.value,e.setState(a)},e.onSubmit=function(t){t.preventDefault();var a=e.state,n=a.name,c=a.shortDescription,r=a.longDescription;E.a.post("/products",{name:n,shortDescription:c,longDescription:r}).then((function(t){e.props.history.push("/")}))},e.state={name:"",shortDescription:"",longDescription:""},e}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.state,t=e.name,a=e.shortDescription,n=e.longDescription;return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"panel panel-default"},c.a.createElement("div",{class:"panel-heading"},c.a.createElement("h3",{class:"panel-title"},"ADD PRODUCT")),c.a.createElement("div",{class:"panel-body"},c.a.createElement("h4",null,c.a.createElement(o.b,{to:"/"},c.a.createElement("span",{class:"glyphicon glyphicon-th-list","aria-hidden":"true"})," Products List")),c.a.createElement("form",{onSubmit:this.onSubmit},c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"isbn"},"Name:"),c.a.createElement("input",{type:"text",class:"form-control",name:"name",value:t,onChange:this.onChange,placeholder:"Name"})),c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"title"},"ShortDescription:"),c.a.createElement("input",{type:"text",class:"form-control",name:"shortDescription",value:a,onChange:this.onChange,placeholder:"ShortDescription"})),c.a.createElement("div",{class:"form-group"},c.a.createElement("label",{for:"author"},"LongDescription:"),c.a.createElement("input",{type:"text",class:"form-control",name:"longDescription",value:n,onChange:this.onChange,placeholder:"LongDescription"})),c.a.createElement("button",{type:"submit",class:"btn btn-default"},"Submit")))))}}]),t}(n.Component),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={product:{}},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("/products/"+this.props.match.params.id).then((function(t){e.setState({product:t.data}),console.log(e.state.product)}))}},{key:"delete",value:function(e){var t=this;console.log(e),E.a.delete("/products/"+e).then((function(e){t.props.history.push("/")}))}},{key:"render",value:function(){return c.a.createElement("div",{class:"container"},c.a.createElement("div",{class:"panel panel-default"},c.a.createElement("div",{class:"panel-heading"},c.a.createElement("h3",{class:"panel-title"},"Product Details")),c.a.createElement("div",{class:"panel-body"},c.a.createElement("h4",null,c.a.createElement(o.b,{to:"/"},c.a.createElement("span",{class:"glyphicon glyphicon-th-list","aria-hidden":"true"})," Products List")),c.a.createElement("dl",null,c.a.createElement("dt",null,"Name:"),c.a.createElement("dd",null,this.state.product.name),c.a.createElement("dt",null,"ShortDescription:"),c.a.createElement("dd",null,this.state.product.shortDescription),c.a.createElement("dt",null,"LongDescription:"),c.a.createElement("dd",null,this.state.product.longDescription)),c.a.createElement(o.b,{to:"/edit/".concat(this.state.product.id),class:"btn btn-success"},"Edit"),"\xa0",c.a.createElement("button",{onClick:this.delete.bind(this,this.state.product.id),class:"btn btn-danger"},"Delete"))))}}]),t}(n.Component);l.a.render(c.a.createElement(o.a,null,c.a.createElement("div",null,c.a.createElement(s.a,{exact:!0,path:"/",component:b}),c.a.createElement(s.a,{path:"/edit/:id",component:g}),c.a.createElement(s.a,{path:"/create",component:f}),c.a.createElement(s.a,{path:"/show/:id",component:v}))),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.53772fa7.chunk.js.map