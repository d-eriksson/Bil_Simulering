using System;
using UnityEngine;
using System.Reflection;

namespace TrendMe {

    [Serializable]
    public class RemoteFloatField : RemoteField<float> { }
    [Serializable]
    public class RemoteVectorField : RemoteField<Vector3> { }

	public abstract class RemoteField<T>
	{
		[SerializeField] GameObject targetGameObject;
		[SerializeField] Component targetScript;
		string _fieldName;
		[SerializeField] string fieldName = "";

		string[] splitFieldName;
		MemberInfo[] memberInfo;

		char[] split = {'.'};

		private void GetFieldInfo(){
			_fieldName = fieldName;
			if (targetScript == null){ 
				memberInfo = new MemberInfo[0];
				return;
			}
			splitFieldName = fieldName.Split (split);
			if (splitFieldName.Length < 1) return;
			memberInfo = new MemberInfo[splitFieldName.Length];
			var type = targetScript.GetType();
			for(int i = 0; i < memberInfo.Length; i++){
				MemberInfo[] tempArray = type.GetMember(splitFieldName[i], BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
				if (tempArray.Length < 1) return;
				memberInfo[i] = tempArray[0];
				if (tempArray[0].MemberType == MemberTypes.Property){
					type = ((PropertyInfo) tempArray[0]).PropertyType;
				} else if (tempArray[0].MemberType == MemberTypes.Field){
					type = ((FieldInfo) tempArray[0]).FieldType;
				} else {
					return;
				}
			}
		}

		[SerializeField] T _Value;

		public T Value {
			get {
				_Value = default(T);
				if (fieldName != _fieldName) GetFieldInfo();
				object currentTarget = targetScript;
				for (int i = 0; i < memberInfo.Length; i++){
					if (memberInfo[i] == null) return default(T);
					if (memberInfo[i].MemberType == MemberTypes.Field){
						currentTarget = ((FieldInfo)memberInfo[i]).GetValue(currentTarget);
					} else if (memberInfo[i].MemberType == MemberTypes.Property){
						currentTarget = ((PropertyInfo)memberInfo[i]).GetValue(currentTarget,null);
					} else {
						return default(T);
					}
					if(currentTarget == null) break;
				}
			    try {
			        _Value = (T) Convert.ChangeType(currentTarget, typeof (T));
			    }
			    catch {
			        
			    }

			    return _Value;
			}
		}
	}
}
