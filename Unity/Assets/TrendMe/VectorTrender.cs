using UnityEngine;
using System.Collections;

namespace TrendMe {

    public class VectorTrender : Trender {

        [SerializeField] private RemoteVectorField target;
        [SerializeField] private AnimationCurve trendX;
        [SerializeField] private AnimationCurve trendY;
        [SerializeField] private AnimationCurve trendZ;

        protected override string[] DataToStrings() {
            string[] data = new string[trendX.keys.Length];
            for (int i = 0; i < trendX.keys.Length; i++) {
                data[i] = trendX.keys[i].time + "," + trendX.keys[i].value + "," + trendY.keys[i].value + "," + trendZ.keys[i].value;
            }
            return data;
        }

        protected override void GraphCurrentValue(float time) {
            trendX.AddKey(time, target.Value.x);
            trendY.AddKey(time, target.Value.y);
            trendZ.AddKey(time, target.Value.z);
        }
    }
}
