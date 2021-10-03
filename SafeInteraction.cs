using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SafeInteraction : MonoBehaviour
{

    private LookingAtIT _lookingAtIT;
    private ButtonOnSafe _buttonOnSafe;
    private CastToObject castToObject;

    private bool _clicked;

    private void Awake()
    {
        castToObject = Camera.main.GetComponent<CastToObject>();
        _buttonOnSafe = GetComponent<ButtonOnSafe>();
       
    }

    void Update()
    {
        if (castToObject.objectDetected.gameObject == gameObject && Input.GetMouseButtonDown(0) && !_clicked)
        {
            _buttonOnSafe.Pressed();
            _clicked = true;
            Invoke("WaitForIt", 1);
        }

    }

    public void InteractWithSafe()
    {
        _buttonOnSafe.Pressed();
        _clicked = true;
        Invoke("WaitForIt", 1);
    }

    void WaitForIt()
    {
        _clicked = false;
    }

}
