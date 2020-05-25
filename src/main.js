const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A",  url: "https://www.aliyun.com/" },
  {logo: "B", url: "https://www.bootcdn.cn/",},
];


const simplifyUrl = (url) => {
  return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/, '') // 删除 / 开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
      <div class="site">
         <div class="logo">${node.logo}</div>
         <div class="link">${simplifyUrl(node.url)}</div>
         <div class="close">
             <svg class="icon">
                 <use xlink:href="#icon-shanchu"></use>
             </svg>
         </div>
      </div>
  </li>`).insertBefore($lastLi);
    $li.on('click',(e)=>{
      window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
      e.stopPropagation() //阻止冒泡
      hashMap.splice(index,1)
      render()
    })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是？");
  if (url.indexOf("http") !== 0) {
    //alert('请输入https开头的网址')
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  // console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  // console.log(hashMap);
  // console.log(typeof string);
  // console.log(string);
  localStorage.setItem("x", string);
};
$(document).on('keypress',(e)=>{
  const {key} = e
 for(let i=0;i<hashMap.length;i++){
     if(hashMap[i].logo.toLocaleLowerCase() === key){
        window.open((hashMap[i].url
        ))
     }
 }
})