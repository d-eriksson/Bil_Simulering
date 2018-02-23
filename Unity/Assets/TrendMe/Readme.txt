Welcome to TrendMe. Thanks for downloading this asset.

TrendMe is designed to allow easy trending of any data point in you game. You can also save this data to a .csv for easy export to data analysis software, such as Excel or JMP. TrendMe is great for debugging complex interactions, or for getting research data out of simulations.

If you want to just get started you can open up the example scene and play around without reading any of this documentation

Using TrendMe

The key component of TrendMe is the Trender. Attatch the Trender to a GameObject by using the Add Component -> Scripts -> TrendMe -> Trender. Or you can just type in Trender in the search menu.

The Inspector

The inspector for a Trender has several fields. The Trend feild displays a curve of the data that has been recorded. Click on this to see the recorded trend data. 

The target field displays the current target. If a target is set you will see a text description of the target, along with its current value. Clicking on drop down menu next to the target feild allows you to select a target. 

Target Game Object is the GameObject that the data of interest is located on. Assign this by dragging and droping in the inspector.

Component is the name of the Component you wish to trend. Choose this from the dropdown menu.

Member Name is the name of the member you wish to trend. This can be any property or field on the Component. If you choose a type that is not trendable, another Member Name feild will be displayed. You can continue to choose Members until you find a trendable type, or until you run out of types. If you find a trendable type the message "Success, value will trend" is displayed. If the data type cannot be trended the message "No watchable data" will be displayed.

Tick instructs the trender how often to poll the data for trend results. If this is set to zero the data will be polled every frame. Note that low values for tick will result in massive amounts of data being generated.

Save Trend On Destroy. If this is true the data will be saved to a .csv when the Trender is destroyed. This includes if the Trender is destroyed by changing scenes, or by clicking the stop button in the inspector.

File Name. If the data is saved this filename is used. The data is saved to Application.persistentDataPath + "/TrendMe/" + fileName. You can also save data explicitly by calling Trender.Save(). This method is overloaded to allow you to specify an alternate file name. Note that there is no checking if the file already exists. Existing data will be overwritten by the new data.


FAQ

What can I trend
- You can trend any data of type float or int

Does this data have to be on a MonoBehaviour?
- No, but it does have to be referenced from a MonoBehaviour. The inspector of TrendMe allows you to step through type references to find any data point you want

Can I trend other data types?
- Currently no, if you want to trend other data types contact the authour at richardbgubb@gmail.com for inculsion into a future version.

Do I need to add a new Trender for each trend I want to use?
- Yes. If you want support for multiple trends on a single Trender contact the authour at richardbgubb@gmail.com for inculsion in a future version

Can I trend properties or fields with an indexer?
- No. If you want support for indexers contact the authour at richardbgubb@gmail.com for inculsion in a future version

Can I start and stop the Trender?
- Yes. Simply enable and disable the trender as appropriate.

How many data points can the trender store?
- I got to 30,000 points in my test scene before I gave up. Note that saving this many data points takes several minutes. But I noted no performance issues while running. The saved .csv came to 600 kB in size. So there is still a lot of room to play. If anyone does discover a hard limit let me know at richardbgubb@gmail.com.