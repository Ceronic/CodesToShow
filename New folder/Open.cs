using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;

public class Open : MonoBehaviour
{
    public Animator animator;

    [HideInInspector]
    public bool activated = false;
    private bool started = false;
    public bool closed = true;

    public string eventToMakeUnlocked;

    public bool isLocked;
    public int doorKeyToOpen; // Whatever Data To Check

    public bool hasMessageOnLock;
    public bool messageHasTriggered;
    public bool isMessageOneShot = true;
    public bool isDisableTextBackground = true;
    [TextArea]
    public string messageOnLockedEtc;
    public float messageTimeOutDissappear = 5.0f;
    public TextAnchor textAnchor = TextAnchor.UpperLeft;

    private Sfx _sfx;
    private bool _failSfxPlaying;

    public bool isPlayLockSfxOneShot = true;

    public bool isEventOnOpenOneShot = true;
    public UnityEvent eventOnOpen;
    public bool isEventOnLockedOneShot = true;
    public UnityEvent eventOnLocked;

    private bool _eventOnOpenIsTriggered;
    private bool _eventOnIsLockedIsTriggered;

    private void Awake()
    {

        _sfx = GetComponent<Sfx>();
    }

    public void OnInteractWithDoor()
    {
        if (activated)
        {
            if (isLocked)
            {
                EventOnLocked();

                if (_sfx.audioSource.isPlaying) // TO DO REMOVE THIS CODE and LOCK SFX CAN PLAY now that no Update
                {
                    return;
                }
                else if (_failSfxPlaying)
                {

                    _sfx.audioSource.Stop();
                }
                else
                {
                    if (hasMessageOnLock)
                    {
                        if (isMessageOneShot)
                        {
                            if (!messageHasTriggered)
                            {
                                TextMessagePanel.Instance.ShowSetOnlyMessageNoBackgroundText(true, true, messageOnLockedEtc, textAnchor);
                                messageHasTriggered = true;
                            }
                        }
                        else
                        {
                            TextMessagePanel.Instance.ShowSetOnlyMessageNoBackgroundText(true, true, messageOnLockedEtc, textAnchor);
                            // TextMessagePanel.Instance.SetTextPanelImageBackground(null);
                        }
                        StartCoroutine("MessageTimeOut", messageTimeOutDissappear);
                    }
                    if (!_failSfxPlaying)
                    {
                        _sfx.PlayRandomOnFailSfx();
                        _failSfxPlaying = true;
                    }
                }

                //CheckIfUnlockable();
            }
            else // If Unlocked Do This
            {
                OpenDoor();
            }
        }

    }


    public void OpenDoor()
    {
        EventOnOpen();
        Animation();
    }


    public void OpenDoorInstantly()
    {
        isLocked = false;
        activated = true;
        EventOnOpen();
        Animation();
    }


    public void EventOnLocked()
    {
        if (isEventOnLockedOneShot)
        {
            if (!_eventOnIsLockedIsTriggered)
            {
                eventOnLocked.Invoke();
                _eventOnOpenIsTriggered = true;
            }
        }
        else
        {
            eventOnOpen.Invoke();
        }
    }

    public void EventOnOpen()
    {
        if (isEventOnOpenOneShot)
        {
            if (!_eventOnOpenIsTriggered)
            {
                eventOnOpen.Invoke();
                _eventOnOpenIsTriggered = true;
            }
        }
        else
        {
            eventOnOpen.Invoke();
        }
    }


    public void CheckIfUnlockable()
    {
        if (PlayerEventsLog.Instance.CheckIfEventIsTrue(eventToMakeUnlocked))
        {
            isLocked = false;
        }
    }


    public void CheckIfBasementUnlockable()
    {
        if (GameManager.Instance.hasBasementKey)
        {
            isLocked = false;
            OpenDoorInstantly();
            animator.Play("NewDoorOpen");
        }
    }

    public void SetLocked(bool setter)
    {
        isLocked = setter;
        if (isLocked)
        {
            if (isPlayLockSfxOneShot)
            {
                _sfx.PlayRandomSfx();
                isPlayLockSfxOneShot = false;
            }

            animator.Play("InstantClosed");
        }
    }


    public void SetEnableOneShotEventOnOpen(bool setter)
    {
        isEventOnOpenOneShot = setter;
    }


    public IEnumerator MessageTimeOut(float messageTimeOutDissappear)
    {
        float normalizedTime = 0;
        while (normalizedTime <= 1f) // In a while loop while counting down
        {
            normalizedTime += Time.deltaTime / messageTimeOutDissappear;
            yield return null;
        }
        TextMessagePanel.Instance.ShowSetOnlyMessageNoBackgroundText(false, false);
        _failSfxPlaying = false;
    }


    void Animation()
    {
        if (activated && !started)
        {
            _sfx.PlayRandomSfx();

            animator.SetBool("Close", false);
            animator.SetBool("Open", true);
            activated = false;
            started = true;
        }

        if (activated && started)
        {
            _sfx.PlayRandomSfx();

            animator.SetBool("Open", false);
            animator.SetBool("Close", true);
            activated = false;
            started = false;
        }

    }


}
