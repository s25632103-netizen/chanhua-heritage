// 導覽列下拉選單：滑鼠移到頁面名稱上，自動列出該頁的大標題（h2）
function chTag(doc){
  var m=doc.querySelector('.content');if(!m)return[];
  var out=[];
  m.querySelectorAll('h2,h3').forEach(function(h,i){
    if(!h.id)h.id='sec'+(i+1);
    if(h.tagName==='H2')out.push({id:h.id,text:h.textContent});
  });
  return out;
}
document.addEventListener('DOMContentLoaded',function(){
  chTag(document);
  var here=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.links a').forEach(function(a){
    var page=a.getAttribute('href');
    if(!page||page==='index.html')return;
    var wrap=document.createElement('span');wrap.className='dd';
    a.parentNode.insertBefore(wrap,a);wrap.appendChild(a);
    var menu=document.createElement('div');menu.className='dd-menu';wrap.appendChild(menu);
    function fill(list){
      if(!list.length){wrap.classList.add('dd-empty');return;}
      list.forEach(function(s){
        var l=document.createElement('a');l.href=page+'#'+s.id;l.textContent=s.text;menu.appendChild(l);
      });
    }
    if(page===here){fill(chTag(document));return;}
    fetch(page).then(function(r){return r.text();}).then(function(t){
      fill(chTag(new DOMParser().parseFromString(t,'text/html')));
    }).catch(function(){wrap.classList.add('dd-empty');});
  });
  var top=document.createElement('a');top.href='#';top.className='to-top';top.textContent='↑';top.title='回到頂端';
  document.body.appendChild(top);
  if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t)setTimeout(function(){t.scrollIntoView();},50);}
});
