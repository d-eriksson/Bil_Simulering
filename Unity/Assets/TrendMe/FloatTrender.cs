using UnityEngine;

namespace TrendMe {
    public class FloatTrender : Trender {
        [SerializeField] private RemoteFloatField target;
        [SerializeField] private AnimationCurve trend;

        protected override void GraphCurrentValue(float time) {
            trend.AddKey(time, target.Value);
        }

        protected override string[] DataToStrings() {
            string[] data = new string[trend.keys.Length];
            for (int i = 0; i < trend.keys.Length; i++) {
                data[i] = trend.keys[i].time + "," + trend.keys[i].value;
            }
            return data;
        }
    }
}
