using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ButtonOnSafe : MonoBehaviour
{

    public CheckKeyPressed check;

    public GameObject slot1;
    public GameObject slot2;
    public GameObject slot3;
    public GameObject slot4;

    private Sfx _sfx;
    private bool _failSfxPlaying;

    private void Start()
    {
        _sfx = GetComponent<Sfx>();
    }

    public void Pressed()
    {
        if (!check.slot4used && check.slot1used && check.slot2used && check.slot3used)
        {
            slot4.SetActive(true);
            check.slot4used = true;
            _sfx.PlayRandomSfx();
        }
        else if (!check.slot3used && check.slot1used && check.slot2used)
        {
            slot3.SetActive(true);
            check.slot3used = true;
            _sfx.PlayRandomSfx();
        }
        else if (!check.slot2used && check.slot1used)
        {
            slot2.SetActive(true);
            check.slot2used = true;
            _sfx.PlayRandomSfx();
        }
        else if (!check.slot1used)
        {
            slot1.SetActive(true);
            check.slot1used = true;
            _sfx.PlayRandomSfx();
        }
    }



}
