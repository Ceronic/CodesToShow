using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CastToObject : MonoBehaviour
{
    public static string selectedObject;
    public string internalObject;
    public RaycastHit hit;
    public float maxDistance;
    //public Transform pickup;
    public bool canBeMoved;
    public GameObject objectDetected;
    public ObjectToHighlight objectToHighlight;

    void Update()
    {
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out hit, maxDistance))
        {          
            selectedObject = hit.transform.gameObject.name;
            internalObject = hit.transform.gameObject.name;
            if (hit.transform.CompareTag("Interactable"))
            {
                canBeMoved = false;
                if (hit.transform.gameObject.GetComponent<LookingAtIT>() != null)
                {
                    hit.transform.gameObject.GetComponent<LookingAtIT>().isLookingAt = true;
                }
                objectDetected = hit.transform.gameObject;
            }
            else if (hit.transform.CompareTag("Movable"))
            {
                canBeMoved = true;
                if (hit.transform.gameObject.GetComponent<LookingAtIT>() != null)
                {
                    hit.transform.gameObject.GetComponent<LookingAtIT>().isLookingAt = true;
                }
                objectDetected = hit.transform.gameObject;
            }
            else
            {              
                canBeMoved = false;
                objectDetected = null;
                //TextMessagePanel.Instance.ShowSetMessageText(false, false); // Now click to remove narrative message
            }
        }
    }

    void OnDrawGizmosSelected()
    {
        // Draw a yellow sphere at the transform's position
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, maxDistance);
    }

}
