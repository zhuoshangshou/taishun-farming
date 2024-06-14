//图表默认配置
const chartsDefaultOpt = {
	color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
	padding: [15,10,0,15],
	enableScroll: false,
	legend: {},
	xAxis: {
		disableGrid: true
	},
	yAxis: {
		gridType: "dash",
		dashLength: 2
	},
	extra: {
		line: {
			type: "curve",
			width: 2,
			activeType: "hollow"
		},
	}
}

//堆叠柱状图
const columnDefaultOpt = {
	//color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
	padding: [15,15,0,5],
	enableScroll: false,
	legend: {},
	xAxis: {
		disableGrid: true,
	},
	yAxis: {
		data: [
			{
				min: 0
			}
		]
	},
	extra: {
		column: {
			type: "meter",
			width: 30,
			meterBorder: 0,
			meterFillColor: "#c0d7d0"
		}
	}
}

//图表数据重组
const resetChartsData =(data)=>{
	var charts_data_arr = []
	var series = []
	var charts_data = {}
	try{
		if(data.length){
			
			data.forEach((item,index)=>{
				var series_item = JSON.parse(item.tea_buy);
				var series_date = new Date(item.date)
				var series_time = `${series_date.getMonth()+1}/${series_date.getDate()}`
				
				if(series_item.length){
					series_item.forEach(s=>{
						let is_repetition = series.findIndex(ser=>ser.name==s.name);
						if(is_repetition>=0){
							series[is_repetition].data.push(s.price)
						}else{
							series.push({name:s.name,data:[s.price]})
						}
						//console.log('is_repetition',is_repetition,series,s)
					})
				}
				
				charts_data_arr.push({series:series_item,date:series_time})
			})
		}
		//console.log('pageFetch charts_data_arr',charts_data_arr)
		var categories = charts_data_arr.map(item=>item.date)
		//console.log('pageFetch categories',categories)
		//console.log('pageFetch series',series)
		charts_data = {categories,series}
		//console.log('resetChartsData charts_data',charts_data)
	}catch(err){
		console.log('resetChartsData err',err)
	}
	return charts_data;
}


// 堆又图表数据重组
const resetColumnChartsData =(data)=>{
	var charts_data_arr = []
	var series = [
		{name: "收购量/斤",color:'#c0d7d0',data:[]},
		{name: "已收购/斤",color:'#17c776',data:[]}
	]
	var charts_data = {}
	try{
		if(data.length){
			data.forEach(item=>{
				series[0].data.push(item.purchase)
				series[1].data.push(item.store)
			})
		}
		var categories = data.map(item=>item.name)
		charts_data = {categories,series}
		//console.log('resetChartsData data',data)
		//console.log('resetChartsData charts_data',charts_data)
	}catch(err){
		console.log('resetChartsData err',err)
	}
	return charts_data;
}

//打开门店地图
const resLocationParms=(shopInfo)=>{
	var parms = {}
	try{
		var shop_coord = shopInfo.shop_coord.split(',');
		if(shop_coord && shop_coord.length==2){
			var latitude = Number(shop_coord[0]);
			var longitude = Number(shop_coord[1]);
			//console.log('shop_coord',latitude,longitude,shop_coord)
			parms = {
				latitude,
				longitude,
				name:shopInfo.shopName,
				address:shopInfo.address,
				scale: 18
			}
		}
	}catch(err){
		console.log('resetChartsData err',err)
	}
	
	return parms;
}

export default { 
	chartsDefaultOpt,
	columnDefaultOpt,
	resetChartsData,
	resetColumnChartsData,
	resLocationParms
}
