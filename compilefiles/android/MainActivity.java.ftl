package ${package_name};

import com.yonyou.uap.um.core.*;
import android.os.*;

public  class MainActivity extends UMWebActivity {

	@Override
	public void onInit(Bundle arg0) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		//TODO Auto-generated code
		this.setWebStartPage("${app_start}");//设置起始页面xxx.html
		
		super.onCreate(savedInstanceState);
	}
	
	@Override
	public String getControllerName() {
		return "Controller";
	}
	
	
	@Override
	public String getContextName() {
		return "";
	}

	@Override
	public String getNameSpace() {
		return "UMP.UI.Mvc";
	}


}

