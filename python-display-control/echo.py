import RPi.GPIO as GPIO
import time
import subprocess

TRIG = 12
ECHO = 16

TRIG_WIDTH_S = 0.00001
SOUND_SPEED_M_S = 343

DISTANCE_THRESHOLD_M = 0.3

TURN_DISPLAY_ON_SCRIPT = "/home/pi/mirror/scripts/turn-on.bash"
TURN_DISPLAY_OFF_SCRIPT = "/home/pi/mirror/scripts/turn-off.bash"


def trigger():
  # Send trigger
  GPIO.output(TRIG, GPIO.HIGH)
  time.sleep(TRIG_WIDTH_S)
  GPIO.output(TRIG, GPIO.LOW)

  # Read echo
  start_time = time.time()
  while GPIO.input(ECHO) == GPIO.LOW:
    start_time = time.time()

  end_time = time.time()
  while GPIO.input(ECHO) == GPIO.HIGH:
    end_time = time.time()

  echo_duration = end_time - start_time
  distance = echo_duration * SOUND_SPEED_M_S / 2

  return distance


def main():
  GPIO.setmode(GPIO.BOARD)
  GPIO.setup(TRIG, GPIO.OUT)
  GPIO.setup(ECHO, GPIO.IN)

  GPIO.output(TRIG, GPIO.LOW)
  time.sleep(2)

  # Loop
  distance = trigger()
  print(f"Distance: {distance} m")
  if distance < DISTANCE_THRESHOLD_M:
    print("Turning display on")
    # subprocess.run(["bash", TURN_DISPLAY_ON_SCRIPT])
  else:
    print("Not close enough")

  GPIO.cleanup()


if __name__ == "__main__":
  main()
