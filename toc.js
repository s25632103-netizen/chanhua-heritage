// 自動產生「快速跳轉」下拉選單：讀取頁面中的 h2/h3 標題
document.addEventListener('DOMContentLoaded',function(){
  var main=document.querySelector('.content');
  if(!main)return;
  var hs=main.querySelectorAll('h2,h3');
  if(hs.length<2)return;
  var box=document.createElement('div');box.className='toc-jump';
  var sel=document.createElement('select');sel.setAttribute('aria-label','快速跳轉');
  sel.innerHTML='<option value="">☰ 快速跳轉到…</option>';
  hs.forEach(function(h,i){
    if(!h.id)h.id='sec'+(i+1);
    var o=document.createElement('option');o.value=h.id;
    o.textContent=(h.tagName==='H3'?'　└ ':'')+h.textContent;
    sel.appendChild(o);
  });
  sel.addEventListener('change',function(){
    if(!sel.value)return;
    document.getElementById(sel.value).scrollIntoView({behavior:'smooth',block:'start'});
    sel.value='';
  });
  box.appendChild(sel);main.insertBefore(box,main.firstChild);
  var top=document.createElement('a');top.href='#';top.className='to-top';top.textContent='↑';top.title='回到頂端';
  document.body.appendChild(top);
});
