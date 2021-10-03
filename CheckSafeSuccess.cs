using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CheckSafeSuccess : MonoBehaviour
{
    public CheckKeyPressed checkKey;
    public GameObject firstNumber;
    public GameObject secondNumber;
    public GameObject thirdNumber;
    public GameObject fourthNumber;

    public GameObject[] allNumbers;
    public Animator numberChosen;
    public Animator safeDoor;

    private Sfx _sfx;
    private bool _sfxPlaying;

    private bool _is_success_sfx_played;
    private bool _is_fail_sfx_played;

    public bool _success;
    public bool _checkIfSuccess = true;

    public GenericInvokeUnityEvent unityEvent;
    // Start is called before the first frame update
    void Start()
    {
        _sfx = GetComponent<Sfx>();
        unityEvent = GetComponent<GenericInvokeUnityEvent>();
    }

    // Update is called once per frame
    void Update()
    {
        if (checkKey.slot1used && checkKey.slot2used && checkKey.slot3used && checkKey.slot4used)
        {
            if (firstNumber.activeSelf && secondNumber.activeSelf && thirdNumber.activeSelf && fourthNumber.activeSelf && _checkIfSuccess)
            {
                _success = true;
                safeDoor.SetBool("Open", true);

                if (!_is_success_sfx_played)
                {
                    _sfx.PlayRandomOnSuccessSfx();
                    _is_success_sfx_played = true;
                    unityEvent.InvokeUnityEvent();
                }
            }
            else
            {
                _checkIfSuccess = false;
                StartCoroutine(WrongNumber());
                if (!_is_fail_sfx_played)
                {
                    _sfx.PlayRandomOnFailSfx();
                    _is_fail_sfx_played = true;
                    StartCoroutine(Wait());
                }

            }
        }
    }



    IEnumerator WrongNumber()
    {
        numberChosen.SetBool("Check", true);
        yield return new WaitForSeconds(1);
        numberChosen.SetBool("Check", false);
        checkKey.slot1used = false;
        checkKey.slot2used = false;
        checkKey.slot3used = false;
        checkKey.slot4used = false;
        foreach (GameObject num in allNumbers)
        {
            num.SetActive(false);
        }
        _checkIfSuccess = true;
    }

    IEnumerator Wait()
    {
        yield return new WaitForSeconds(1);
        _is_fail_sfx_played = false;
    }



}
