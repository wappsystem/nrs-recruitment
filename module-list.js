(function(){
    var modules={
        "panel-main-nrs":    			 {url:"$H/m/elig-questions-data.html",Table:"nrs-recruitment-record",form_module:"elig-questions-form"},
        "elig-questions-form":    			 {url:"$H/m/elig-questions-form.html",Table:"nrs-recruitment-record"},
        "panel-main-nrs-eligible":      {url:"$H/m/elig-questions-eligible-data.html",Table:"nrs-recruitment-record",form_module:"panel-main-nrs-eligible-form"},
        "panel-main-nrs-eligible-form":		    {url:"$H/m/elig-questions-eligible-form.html",Table:"nrs-recruitment-record"},
        "panel-main-nrs-non-eligible":  {url:"$H/m/elig-questions-non-eligible-data.html",Table:"nrs-recruitment-record"},
    }
    //for(m in modules){$vm.module_list[m]=modules[m];}


    for(p in modules){
        $vm.module_list[p]=modules[p];
        $vm.module_list[p].url=$vm.module_list[p].url.replace('$H',$vm.hosting_path);
    }
    if(window.location.toString().indexOf('tb=demo')!=-1){
        for(p in $vm.module_list){
            $vm.module_list[p].Table="demo-"+$vm.module_list[p].Table;
        }
    }

})();
