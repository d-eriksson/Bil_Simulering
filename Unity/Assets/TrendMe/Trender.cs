using UnityEngine;
using System.Collections;
using System.IO;

public abstract class Trender : MonoBehaviour {

    [SerializeField] protected float tick = 1;
    [SerializeField] protected bool saveTrendOnDestroy;
    [SerializeField] protected bool overwriteFile;
    [SerializeField] protected string fileName = "";

    private void Start() {
        StartCoroutine(Graph());
    }

    private void OnDestroy() {
        if (saveTrendOnDestroy) {
            Save();
        }
    }

    public void Save(string fileName) {
        if (fileName == "")
            return;
        string[] data = DataToStrings();
        if (!Directory.Exists(Application.persistentDataPath + "TrendMe")) {
            Directory.CreateDirectory(Application.persistentDataPath + "/TrendMe");
        }
        if (!overwriteFile) {
            int fileNumber = 1;
            string originalFileName = fileName;
            while (File.Exists(Application.persistentDataPath + "/TrendMe/" + fileName + ".csv")) {
                fileName = originalFileName + fileNumber++;
            }
        }
        File.WriteAllLines(Application.persistentDataPath + "/TrendMe/" + fileName + ".csv", data);
    }

    public void Save() {
        if (fileName == "") {
            Debug.LogError("Cannot save an empty filename!");
            return;
        }
        Save(fileName);
    }

    protected IEnumerator Graph() {
        while (true) {
            GraphCurrentValue(Time.time);
            yield return new WaitForSeconds(tick);
        }
    }

    protected abstract string[] DataToStrings();

    protected abstract void GraphCurrentValue(float time);

}
