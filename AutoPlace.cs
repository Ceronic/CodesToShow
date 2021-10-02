using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AutoPlace : MonoBehaviour
{
    public Transform objectPlace;
    public GameObject theObject;
    public GameObject theObject2;
    public bool itemInPlace;

    private Sfx _sfx;

    private PlayerController _playerController;

    private void Awake()
    {
        _sfx = GetComponent<Sfx>();
        _playerController = FindObjectOfType<PlayerController>(); // To Fix Sound Bug in AutoPlace Script... patchworks *Rob*
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject == theObject && itemInPlace == false)
        {
            SetPlaceObject(theObject);
            //Added SFX On Slotted In Object
            _sfx.PlayRandomSfx();
        }

        if (other.gameObject == theObject2 && itemInPlace == false)
        {
            SetPlaceObject(theObject2);
            //Added SFX On Slotted In Object
            _sfx.PlayRandomSfx();
        }

    }
    
    public void SetPlaceObject(GameObject thisObject)
    {
        thisObject.transform.position = objectPlace.transform.position;
        thisObject.GetComponent<InteractableObject>().isInteracted = false;
        thisObject.GetComponent<Rigidbody>().useGravity = false;
        thisObject.GetComponent<InteractableObject>().enabled = false;
        thisObject.GetComponent<InteractableObject>().isCanBePickedUp = false;

        thisObject.GetComponent<LookingAtIT>().SetEnabled(false);

        thisObject.transform.parent = this.transform;
        thisObject.transform.localRotation = Quaternion.Euler(0, 0, 0);
        itemInPlace = true;
        _playerController.objectInHand = null;
    }
}
