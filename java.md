后端的编写：
首先在数据库在demo数据库中建立一个image表，里面的内容分别是private int id;
private  String imageurl;

private  String imagetitle;
private  String imagetype;
private  String imagestate;
Project表，projecttype表
然后在里面写入数据

# 步骤：

文件夹最好都先建好
1.先建立一个Imagecontroller类，里面连接服务器ImageService接口和私有方法Image类
@controller控制层
@RequestMapping("image")用来地址适配
在类里面首先写一个@Autowired
    @Autowired
它允许 Spring 解析并注入所依赖的 Bean 到 Bean 中
先定义一个服务器名imageservice
2.然后在service文件夹下定义一个ImageService接口。
然后定义一个方法，地址适配名字改为getByType
定义一个getbytype方法，是数组列表类型，Image类

<!-- public ArrayList<Image> getByType(String imageType){
        ArrayList<Image> images=imageService.getByType(imageType);

        return images;
    } -->

    alt+enter跳转到ImageService接口直接写入数据
3. 然后在entity里面创建一个Image类，里面定义的是demo数据库中image表里面的值，private int id;
private  String imageurl;

private  String imagetitle;
private  String imagetype;
private  String imagestate;
然后分别创建set and get 和重写方法
4.创建一个服务器类，
ImageServiceImpl 里面连接服务器接口和ImageDao接口，内容跟controller里面的内容差不多，在服务器类重写方法。alt +enter跳转到直接写入ImageDao接口。
5.最后在mapper创建一个ImageDao.XML
里面用来写数据库语句，最后要在application.properties里面加入数据库的内容，不然不能连接到数据库的内容
 id 是连接ImageDao里面的方法 然后结果类型在定义的Image类里面。

## 需要注意的是：需要爆红的那些接口，比如服务器类需要的ImageDao和控制层需要的ImageServiceDao都可以用alt+回车直接生成，然后image类里面的方法是需要连接的数据库表的内容，然后ImageDao.XML查询语句等里面的表也必须数据库中的表名一致

 同理，其他后端也是同样的步骤，此次小程序需要的是image,project,projecttype表，所以需要建立一个image后端和project后端，用来导入小程序里面实现遍历操作。
 然后image里面写的是图片的信息。导入不同标签，用于存放轮播图，美食图，景区图。
 project里面写的是景区，美食的一些描述，projecttype写的是项目名字。
