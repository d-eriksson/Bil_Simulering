using System;
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Reflection;
using TrendMe;

namespace TrendMeEditor {
    [CustomEditor(typeof (FloatTrender)), CanEditMultipleObjects]
    public class TrenderEditor : Editor {}

    [CustomPropertyDrawer(typeof (RemoteFloatField))]
    public class RemoteFloatFieldDrawer : RemoteFieldDrawer<float> {
        protected override string PrintValue(SerializedProperty property) {
            return property.FindPropertyRelative("_Value").floatValue.ToString();
        }
    }

    [CustomPropertyDrawer(typeof (RemoteVectorField))]
    public class RemoteVectorFieldDrawer : RemoteFieldDrawer<Vector3> {
        protected override string PrintValue(SerializedProperty property) {
            return property.FindPropertyRelative("_Value").vector3Value.ToString();
        }
    }

    public abstract class RemoteFieldDrawer<T> : PropertyDrawer {

        private float lineHeight;
        private int numLines = 6;
        private bool isOut = true;
        private List<string> options;
        private List<int> selectedIndexs = new List<int>();
        private char[] split = {'.'};

        protected abstract string PrintValue(SerializedProperty property);

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label) {
            lineHeight = base.GetPropertyHeight(property, label);

            return isOut ? (lineHeight + 1)*numLines : lineHeight;
        }

        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label) {
            position.height = lineHeight + 1;
            var baseWidth = position.width;

            isOut = EditorGUI.Foldout(position, isOut, label);
            if (property.FindPropertyRelative("_Value") != null) {
                position.xMin += baseWidth/3f;
                EditorGUI.LabelField(position, property.FindPropertyRelative("fieldName").stringValue);
                position.xMin += baseWidth/3f;
                EditorGUI.LabelField(position, PrintValue(property));
            }

            //indent
            position.xMin = 20;
            position.y += lineHeight + 1;
            ;

            if (!isOut)
                return;

            selectedIndexs.Clear();

            EditorGUI.PropertyField(position, property.FindPropertyRelative("targetGameObject"));
            GameObject target = (GameObject) property.FindPropertyRelative("targetGameObject").objectReferenceValue;
            if (!target) {
                numLines = 2;
                return;
            }

            List<string> componentNames = new List<string>();
            componentNames.Add("");
            foreach (Component t in target.GetComponents<Component>()) {
                componentNames.Add(t.GetType().ToString());
            }

            object targetScript = property.FindPropertyRelative("targetScript").objectReferenceValue;
            selectedIndexs.Add(0);
            if (targetScript != null)
                selectedIndexs[0] = componentNames.IndexOf(targetScript.GetType().ToString());
            if (selectedIndexs[0] == -1) selectedIndexs[0] = 0;

            position.y += lineHeight + 1;
            ;
            selectedIndexs[0] = EditorGUI.Popup(position, "Component", selectedIndexs[0], componentNames.ToArray());
            if (selectedIndexs[0] != 0) {
                property.FindPropertyRelative("targetScript").objectReferenceValue =
                    target.GetComponents<Component>()[selectedIndexs[0] - 1];
                targetScript = target.GetComponents<Component>()[selectedIndexs[0] - 1];
            }

            if (targetScript == null) {
                numLines = 3;
                return;
            }

            string fieldName = "";
            string[] splitstring = property.FindPropertyRelative("fieldName").stringValue.Split(split);
            numLines = 3 + splitstring.Length + 1;

            Type currentType = targetScript.GetType();
            for (int i = 0; i < splitstring.Length; i++) {
                selectedIndexs.Add(0);

                options = new List<string>();
                options.Add("");
                MemberInfo[] members = currentType.GetMembers(
                    BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

                foreach (MemberInfo member in members) {
                    if (member.MemberType == MemberTypes.Field ||
                        member.MemberType == MemberTypes.Property) {
                        object[] atributes = member.GetCustomAttributes(typeof (ObsoleteAttribute), true);
                        if (atributes.Length == 0) {
                            options.Add(member.Name);
                        }
                    }
                }

                if (options.Count > 1) {
                    selectedIndexs[i + 1] = options.IndexOf(splitstring[i]);
                    if (selectedIndexs[i + 1] == -1) selectedIndexs[i + 1] = 0;
                    position.y += lineHeight + 1;
                    ;
                    selectedIndexs[i + 1] = EditorGUI.Popup(position, "Member Name", selectedIndexs[i + 1],
                        options.ToArray());
                    if (selectedIndexs[i + 1] != 0) {
                        if (i != 0) fieldName += ".";
                        fieldName += options[selectedIndexs[i + 1]];
                    }
                    MemberInfo[] info = currentType.GetMember(
                        options[selectedIndexs[i + 1]], BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (info.Length > 0) {
                        if (info[0].MemberType == MemberTypes.Field) {
                            currentType = ((FieldInfo) info[0]).FieldType;
                        }
                        else if (info[0].MemberType == MemberTypes.Property) {
                            currentType = ((PropertyInfo) info[0]).PropertyType;
                        }
                    }
                }
                else {
                    position.y += lineHeight + 1;
                    EditorGUI.LabelField(position, "No watchable data");
                }
            }

            if (currentType != typeof (T)) {
                if (fieldName.Length > 0 && fieldName[fieldName.Length - 1] != '.') {
                    fieldName += ".";
                }
            }
            else {
                position.y += lineHeight + 1;
                ;
                EditorGUI.LabelField(position, "Success, value will trend");
            }
            property.FindPropertyRelative("fieldName").stringValue = fieldName;
        }

    }
}
