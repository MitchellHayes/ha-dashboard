// this is an auto generated file, do not change this manually

import { ServiceFunction, ServiceFunctionTypes } from '@hakit/core';
declare module '@hakit/core' {
  export interface CustomSupportedServices<T extends ServiceFunctionTypes = 'target'> {
    homeassistant: {
      // undefined
      savePersistentStates: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      restart: ServiceFunction<object, T, object>;
      // undefined
      checkConfig: ServiceFunction<object, T, object>;
      // undefined
      updateEntity: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
        }
      >;
      // undefined
      reloadCoreConfig: ServiceFunction<object, T, object>;
      // undefined
      setLocation: ServiceFunction<
        object,
        T,
        {
          //  @example 32.87336 @constraints  number: mode: box, min: -90, max: 90, step: any
          latitude: number;
          //  @example 117.22743 @constraints  number: mode: box, min: -180, max: 180, step: any
          longitude: number;
          //  @example 120 @constraints  number: mode: box, step: any
          elevation?: number;
        }
      >;
      // undefined
      reloadCustomTemplates: ServiceFunction<object, T, object>;
      // undefined
      reloadConfigEntry: ServiceFunction<
        object,
        T,
        {
          //  @example 8955375327824e14ba89e4b29cc3ec9a @constraints  config_entry:
          entry_id?: unknown;
        }
      >;
      // undefined
      reloadAll: ServiceFunction<object, T, object>;
    };
    persistentNotification: {
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example Please check your configuration.yaml.
          message: string;
          //  @example Test notification
          title?: string;
          //  @example 1234
          notification_id?: string;
        }
      >;
      // undefined
      dismiss: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          notification_id: string;
        }
      >;
      // undefined
      dismissAll: ServiceFunction<object, T, object>;
    };
    systemLog: {
      // undefined
      clear: ServiceFunction<object, T, object>;
      // undefined
      write: ServiceFunction<
        object,
        T,
        {
          //  @example Something went wrong
          message: string;
          //
          level?: 'debug' | 'info' | 'warning' | 'error' | 'critical';
          //  @example mycomponent.myplatform
          logger?: string;
        }
      >;
    };
    logger: {
      // undefined
      setDefaultLevel: ServiceFunction<
        object,
        T,
        {
          //
          level?: 'debug' | 'info' | 'warning' | 'error' | 'fatal' | 'critical';
        }
      >;
      // undefined
      setLevel: ServiceFunction<object, T, object>;
    };
    frontend: {
      // undefined
      setTheme: ServiceFunction<
        object,
        T,
        {
          //  @example default
          name?: string;
          //  @example default
          name_dark?: string;
        }
      >;
      // undefined
      reloadThemes: ServiceFunction<object, T, object>;
    };
    recorder: {
      // undefined
      purge: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
          //  @constraints  boolean:
          repack?: boolean;
          //  @constraints  boolean:
          apply_filter?: boolean;
        }
      >;
      // undefined
      purgeEntities: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @example sun @constraints  object: multiple: false
          domains?: object;
          //  @example domain*.object_id* @constraints  object: multiple: false
          entity_globs?: object;
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
        }
      >;
      // undefined
      enable: ServiceFunction<object, T, object>;
      // undefined
      disable: ServiceFunction<object, T, object>;
      // undefined
      getStatistics: ServiceFunction<
        object,
        T,
        {
          //  @example 2025-01-01 00:00:00 @constraints  datetime:
          start_time: string;
          //  @example 2025-01-02 00:00:00 @constraints  datetime:
          end_time?: string;
          //  @example sensor.energy_consumption,sensor.temperature @constraints  statistic: multiple: true
          statistic_ids: unknown;
          //  @example hour
          period: '5minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
          //  @example mean,sum
          types: 'change' | 'last_reset' | 'max' | 'mean' | 'min' | 'state' | 'sum';
          //  @example [object Object] @constraints  object: multiple: false
          units?: object;
        }
      >;
    };
    mediaPlayer: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      volumeUp: ServiceFunction<object, T, object>;
      // undefined
      volumeDown: ServiceFunction<object, T, object>;
      // undefined
      mediaPlayPause: ServiceFunction<object, T, object>;
      // undefined
      mediaPlay: ServiceFunction<object, T, object>;
      // undefined
      mediaPause: ServiceFunction<object, T, object>;
      // undefined
      mediaStop: ServiceFunction<object, T, object>;
      // undefined
      mediaNextTrack: ServiceFunction<object, T, object>;
      // undefined
      mediaPreviousTrack: ServiceFunction<object, T, object>;
      // undefined
      clearPlaylist: ServiceFunction<object, T, object>;
      // undefined
      volumeSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          volume_level: number;
        }
      >;
      // undefined
      volumeMute: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          is_volume_muted: boolean;
        }
      >;
      // undefined
      mediaSeek: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.01, mode: box
          seek_position: number;
        }
      >;
      // undefined
      join: ServiceFunction<
        object,
        T,
        {
          //  @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // undefined
      selectSource: ServiceFunction<
        object,
        T,
        {
          //  @example video1 @constraints  state: attribute: source, multiple: false
          source: unknown;
        }
      >;
      // undefined
      selectSoundMode: ServiceFunction<
        object,
        T,
        {
          //  @example Music @constraints  state: attribute: sound_mode, multiple: false
          sound_mode?: unknown;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example {'media_content_id': 'https://home-assistant.io/images/cast/splash.png', 'media_content_type': 'music'} @constraints  media: multiple: false
          media: unknown;
          //
          enqueue?: 'play' | 'next' | 'add' | 'replace';
          //  @example true @constraints  boolean:
          announce?: boolean;
        }
      >;
      // undefined
      browseMedia: ServiceFunction<
        object,
        T,
        {
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
        }
      >;
      // undefined
      searchMedia: ServiceFunction<
        object,
        T,
        {
          //  @example Beatles
          search_query: string;
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
          //  @example album,artist
          media_filter_classes?: string;
        }
      >;
      // undefined
      shuffleSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          shuffle: boolean;
        }
      >;
      // undefined
      unjoin: ServiceFunction<object, T, object>;
      // undefined
      repeatSet: ServiceFunction<
        object,
        T,
        {
          //
          repeat: 'off' | 'all' | 'one';
        }
      >;
    };
    ffmpeg: {
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      stop: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      restart: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
    };
    hassio: {
      // undefined
      addonStart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStop: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonRestart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStdin: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      appStart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  app:
          app: unknown;
        }
      >;
      // undefined
      appStop: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  app:
          app: unknown;
        }
      >;
      // undefined
      appRestart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  app:
          app: unknown;
        }
      >;
      // undefined
      appStdin: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  app:
          app: unknown;
          //  @constraints  object: multiple: false
          input: object;
        }
      >;
      // undefined
      hostShutdown: ServiceFunction<object, T, object>;
      // undefined
      hostReboot: ServiceFunction<object, T, object>;
      // undefined
      backupFull: ServiceFunction<
        object,
        T,
        {
          //  @example Backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
        }
      >;
      // undefined
      backupPartial: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          apps?: object;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example Partial backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
        }
      >;
      // undefined
      restoreFull: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @example password
          password?: string;
        }
      >;
      // undefined
      restorePartial: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          apps?: object;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example password
          password?: string;
        }
      >;
      // undefined
      mountReload: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
        }
      >;
    };
    update: {
      // undefined
      install: ServiceFunction<
        object,
        T,
        {
          //  @example 1.0.0
          version?: string;
          //  @constraints  boolean:
          backup?: boolean;
        }
      >;
      // undefined
      skip: ServiceFunction<object, T, object>;
      // undefined
      clearSkipped: ServiceFunction<object, T, object>;
    };
    conversation: {
      // undefined
      process: ServiceFunction<
        object,
        T,
        {
          //  @example Turn all lights on
          text: string;
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
          //  @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // undefined
      reload: ServiceFunction<
        object,
        T,
        {
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
        }
      >;
    };
    light: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //  @constraints  number: min: -100, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_step_pct?: number;
          //  @constraints  state: attribute: effect, multiple: false
          effect?: unknown;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | 'homeassistant'
            | 'aliceblue'
            | 'antiquewhite'
            | 'aqua'
            | 'aquamarine'
            | 'azure'
            | 'beige'
            | 'bisque'
            | 'blanchedalmond'
            | 'blue'
            | 'blueviolet'
            | 'brown'
            | 'burlywood'
            | 'cadetblue'
            | 'chartreuse'
            | 'chocolate'
            | 'coral'
            | 'cornflowerblue'
            | 'cornsilk'
            | 'crimson'
            | 'cyan'
            | 'darkblue'
            | 'darkcyan'
            | 'darkgoldenrod'
            | 'darkgray'
            | 'darkgreen'
            | 'darkgrey'
            | 'darkkhaki'
            | 'darkmagenta'
            | 'darkolivegreen'
            | 'darkorange'
            | 'darkorchid'
            | 'darkred'
            | 'darksalmon'
            | 'darkseagreen'
            | 'darkslateblue'
            | 'darkslategray'
            | 'darkslategrey'
            | 'darkturquoise'
            | 'darkviolet'
            | 'deeppink'
            | 'deepskyblue'
            | 'dimgray'
            | 'dimgrey'
            | 'dodgerblue'
            | 'firebrick'
            | 'floralwhite'
            | 'forestgreen'
            | 'fuchsia'
            | 'gainsboro'
            | 'ghostwhite'
            | 'gold'
            | 'goldenrod'
            | 'gray'
            | 'green'
            | 'greenyellow'
            | 'grey'
            | 'honeydew'
            | 'hotpink'
            | 'indianred'
            | 'indigo'
            | 'ivory'
            | 'khaki'
            | 'lavender'
            | 'lavenderblush'
            | 'lawngreen'
            | 'lemonchiffon'
            | 'lightblue'
            | 'lightcoral'
            | 'lightcyan'
            | 'lightgoldenrodyellow'
            | 'lightgray'
            | 'lightgreen'
            | 'lightgrey'
            | 'lightpink'
            | 'lightsalmon'
            | 'lightseagreen'
            | 'lightskyblue'
            | 'lightslategray'
            | 'lightslategrey'
            | 'lightsteelblue'
            | 'lightyellow'
            | 'lime'
            | 'limegreen'
            | 'linen'
            | 'magenta'
            | 'maroon'
            | 'mediumaquamarine'
            | 'mediumblue'
            | 'mediumorchid'
            | 'mediumpurple'
            | 'mediumseagreen'
            | 'mediumslateblue'
            | 'mediumspringgreen'
            | 'mediumturquoise'
            | 'mediumvioletred'
            | 'midnightblue'
            | 'mintcream'
            | 'mistyrose'
            | 'moccasin'
            | 'navajowhite'
            | 'navy'
            | 'navyblue'
            | 'oldlace'
            | 'olive'
            | 'olivedrab'
            | 'orange'
            | 'orangered'
            | 'orchid'
            | 'palegoldenrod'
            | 'palegreen'
            | 'paleturquoise'
            | 'palevioletred'
            | 'papayawhip'
            | 'peachpuff'
            | 'peru'
            | 'pink'
            | 'plum'
            | 'powderblue'
            | 'purple'
            | 'red'
            | 'rosybrown'
            | 'royalblue'
            | 'saddlebrown'
            | 'salmon'
            | 'sandybrown'
            | 'seagreen'
            | 'seashell'
            | 'sienna'
            | 'silver'
            | 'skyblue'
            | 'slateblue'
            | 'slategray'
            | 'slategrey'
            | 'snow'
            | 'springgreen'
            | 'steelblue'
            | 'tan'
            | 'teal'
            | 'thistle'
            | 'tomato'
            | 'turquoise'
            | 'violet'
            | 'wheat'
            | 'white'
            | 'whitesmoke'
            | 'yellow'
            | 'yellowgreen';
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness?: number;
          //  @constraints  number: min: -225, max: 255, step: 1, mode: slider
          brightness_step?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: 'long' | 'short';
        }
      >;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //
          flash?: 'long' | 'short';
        }
      >;
      // undefined
      toggle: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //  @constraints  state: attribute: effect, multiple: false
          effect?: unknown;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | 'homeassistant'
            | 'aliceblue'
            | 'antiquewhite'
            | 'aqua'
            | 'aquamarine'
            | 'azure'
            | 'beige'
            | 'bisque'
            | 'blanchedalmond'
            | 'blue'
            | 'blueviolet'
            | 'brown'
            | 'burlywood'
            | 'cadetblue'
            | 'chartreuse'
            | 'chocolate'
            | 'coral'
            | 'cornflowerblue'
            | 'cornsilk'
            | 'crimson'
            | 'cyan'
            | 'darkblue'
            | 'darkcyan'
            | 'darkgoldenrod'
            | 'darkgray'
            | 'darkgreen'
            | 'darkgrey'
            | 'darkkhaki'
            | 'darkmagenta'
            | 'darkolivegreen'
            | 'darkorange'
            | 'darkorchid'
            | 'darkred'
            | 'darksalmon'
            | 'darkseagreen'
            | 'darkslateblue'
            | 'darkslategray'
            | 'darkslategrey'
            | 'darkturquoise'
            | 'darkviolet'
            | 'deeppink'
            | 'deepskyblue'
            | 'dimgray'
            | 'dimgrey'
            | 'dodgerblue'
            | 'firebrick'
            | 'floralwhite'
            | 'forestgreen'
            | 'fuchsia'
            | 'gainsboro'
            | 'ghostwhite'
            | 'gold'
            | 'goldenrod'
            | 'gray'
            | 'green'
            | 'greenyellow'
            | 'grey'
            | 'honeydew'
            | 'hotpink'
            | 'indianred'
            | 'indigo'
            | 'ivory'
            | 'khaki'
            | 'lavender'
            | 'lavenderblush'
            | 'lawngreen'
            | 'lemonchiffon'
            | 'lightblue'
            | 'lightcoral'
            | 'lightcyan'
            | 'lightgoldenrodyellow'
            | 'lightgray'
            | 'lightgreen'
            | 'lightgrey'
            | 'lightpink'
            | 'lightsalmon'
            | 'lightseagreen'
            | 'lightskyblue'
            | 'lightslategray'
            | 'lightslategrey'
            | 'lightsteelblue'
            | 'lightyellow'
            | 'lime'
            | 'limegreen'
            | 'linen'
            | 'magenta'
            | 'maroon'
            | 'mediumaquamarine'
            | 'mediumblue'
            | 'mediumorchid'
            | 'mediumpurple'
            | 'mediumseagreen'
            | 'mediumslateblue'
            | 'mediumspringgreen'
            | 'mediumturquoise'
            | 'mediumvioletred'
            | 'midnightblue'
            | 'mintcream'
            | 'mistyrose'
            | 'moccasin'
            | 'navajowhite'
            | 'navy'
            | 'navyblue'
            | 'oldlace'
            | 'olive'
            | 'olivedrab'
            | 'orange'
            | 'orangered'
            | 'orchid'
            | 'palegoldenrod'
            | 'palegreen'
            | 'paleturquoise'
            | 'palevioletred'
            | 'papayawhip'
            | 'peachpuff'
            | 'peru'
            | 'pink'
            | 'plum'
            | 'powderblue'
            | 'purple'
            | 'red'
            | 'rosybrown'
            | 'royalblue'
            | 'saddlebrown'
            | 'salmon'
            | 'sandybrown'
            | 'seagreen'
            | 'seashell'
            | 'sienna'
            | 'silver'
            | 'skyblue'
            | 'slateblue'
            | 'slategray'
            | 'slategrey'
            | 'snow'
            | 'springgreen'
            | 'steelblue'
            | 'tan'
            | 'teal'
            | 'thistle'
            | 'tomato'
            | 'turquoise'
            | 'violet'
            | 'wheat'
            | 'white'
            | 'whitesmoke'
            | 'yellow'
            | 'yellowgreen';
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: 'long' | 'short';
        }
      >;
    };
    switch: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    backup: {
      // undefined
      createAutomatic: ServiceFunction<object, T, object>;
    };
    tts: {
      // undefined
      speak: ServiceFunction<
        object,
        T,
        {
          //
          media_player_entity_id: string;
          //  @example My name is hanna
          message: string;
          //  @constraints  boolean:
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific @constraints  object: multiple: false
          options?: object;
        }
      >;
      // undefined
      clearCache: ServiceFunction<object, T, object>;
      // Say something using text-to-speech on a media player with google_translate.
      googleTranslateSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
      // Say something using text-to-speech on a media player with cloud.
      cloudSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
    };
    cloud: {
      // undefined
      remoteConnect: ServiceFunction<object, T, object>;
      // undefined
      remoteDisconnect: ServiceFunction<object, T, object>;
    };
    fan: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage?: number;
          //  @example auto @constraints  state: attribute: preset_mode, multiple: false
          preset_mode?: unknown;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      increaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      decreaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      oscillate: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          oscillating: boolean;
        }
      >;
      // undefined
      setDirection: ServiceFunction<
        object,
        T,
        {
          //
          direction: 'forward' | 'reverse';
        }
      >;
      // undefined
      setPercentage: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage: number;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example auto @constraints  state: attribute: preset_mode, multiple: false
          preset_mode: unknown;
        }
      >;
    };
    climate: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      setHvacMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  state: hide_states: unavailable,unknown, multiple: false
          hvac_mode?: unknown;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example away @constraints  state: attribute: preset_mode, multiple: false
          preset_mode: unknown;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          temperature?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_high?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_low?: number;
          //  @constraints  state: hide_states: unavailable,unknown, multiple: false
          hvac_mode?: unknown;
        }
      >;
      // undefined
      setHumidity: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 30, max: 99, unit_of_measurement: %, step: 1, mode: slider
          humidity: number;
        }
      >;
      // undefined
      setFanMode: ServiceFunction<
        object,
        T,
        {
          //  @example low @constraints  state: attribute: fan_mode, multiple: false
          fan_mode: unknown;
        }
      >;
      // undefined
      setSwingMode: ServiceFunction<
        object,
        T,
        {
          //  @example on @constraints  state: attribute: swing_mode, multiple: false
          swing_mode: unknown;
        }
      >;
      // undefined
      setSwingHorizontalMode: ServiceFunction<
        object,
        T,
        {
          //  @example on @constraints  state: attribute: swing_horizontal_mode, multiple: false
          swing_horizontal_mode: unknown;
        }
      >;
    };
    remote: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example BedroomTV
          activity?: string;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 32756745
          device?: string;
          //  @example Play @constraints  object: multiple: false
          command: object;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          num_repeats?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          delay_secs?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          hold_secs?: number;
        }
      >;
      // undefined
      learnCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Turn on @constraints  object: multiple: false
          command?: object;
          //
          command_type?: 'ir' | 'rf';
          //  @constraints  boolean:
          alternative?: boolean;
          //  @constraints  number: min: 0, max: 60, step: 5, unit_of_measurement: seconds, mode: slider
          timeout?: number;
        }
      >;
      // undefined
      deleteCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Mute @constraints  object: multiple: false
          command: object;
        }
      >;
    };
    lawnMower: {
      // undefined
      startMowing: ServiceFunction<object, T, object>;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      dock: ServiceFunction<object, T, object>;
    };
    vacuum: {
      // undefined
      start: ServiceFunction<object, T, object>;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      returnToBase: ServiceFunction<object, T, object>;
      // undefined
      cleanSpot: ServiceFunction<object, T, object>;
      // undefined
      cleanArea: ServiceFunction<
        object,
        T,
        {
          //  @constraints  area: multiple: true, reorder: true
          cleaning_area_id: unknown;
        }
      >;
      // undefined
      locate: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      setFanSpeed: ServiceFunction<
        object,
        T,
        {
          //  @example low @constraints  state: attribute: fan_speed, multiple: false
          fan_speed: unknown;
        }
      >;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example set_dnd_timer
          command: string;
          //  @example { 'key': 'value' } @constraints  object: multiple: false
          params?: object;
        }
      >;
    };
    cover: {
      // undefined
      openCover: ServiceFunction<object, T, object>;
      // undefined
      closeCover: ServiceFunction<object, T, object>;
      // undefined
      setCoverPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopCover: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      openCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      closeCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      stopCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      setCoverTiltPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          tilt_position: number;
        }
      >;
      // undefined
      toggleCoverTilt: ServiceFunction<object, T, object>;
    };
    weather: {
      // undefined
      getForecasts: ServiceFunction<
        object,
        T,
        {
          //
          type: 'daily' | 'hourly' | 'twice_daily';
        }
      >;
    };
    camera: {
      // undefined
      enableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      disableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.jpg
          filename: string;
        }
      >;
      // undefined
      playStream: ServiceFunction<
        object,
        T,
        {
          //
          media_player: string;
          //
          format?: 'hls';
        }
      >;
      // undefined
      record: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.mp4
          filename: string;
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          lookback?: number;
        }
      >;
    };
    scene: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      apply: ServiceFunction<
        object,
        T,
        {
          //  @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80  @constraints  object: multiple: false
          entities: object;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example all_lights
          scene_id: string;
          //  @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200  @constraints  object: multiple: false
          entities?: object;
          //  @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // undefined
      delete: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
    };
    number: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 42
          value: string;
        }
      >;
    };
    button: {
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    imageProcessing: {
      // undefined
      scan: ServiceFunction<object, T, object>;
    };
    group: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      set: ServiceFunction<
        object,
        T,
        {
          //  @example test_group
          object_id: string;
          //  @example My test group
          name?: string;
          //  @example mdi:camera @constraints  icon:
          icon?: string;
          //  @example domain.entity_id1, domain.entity_id2
          entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          add_entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          remove_entities?: string;
          //  @constraints  boolean:
          all?: boolean;
        }
      >;
      // undefined
      remove: ServiceFunction<
        object,
        T,
        {
          //  @example test_group @constraints  object: multiple: false
          object_id: object;
        }
      >;
    };
    notify: {
      // undefined
      sendMessage: ServiceFunction<
        object,
        T,
        {
          //
          message: string;
          //
          title?: string;
        }
      >;
      // undefined
      persistentNotification: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific @constraints  object: multiple: false
          data?: object;
        }
      >;
      // Sends a notification message using the mitchell_and_michelle_phones service.
      mitchellAndMichellePhones: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_iphone integration.
      mobileAppIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_michelle_s_iphone integration.
      mobileAppMichelleSIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_ipad_mitchell integration.
      mobileAppIpadMitchell: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_michelles_ipad integration.
      mobileAppMichellesIpad: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_mitchells_iphone integration.
      mobileAppMitchellsIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the notify service.
      notify: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the google_assistant_sdk service.
      googleAssistantSdk: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
    };
    valve: {
      // undefined
      openValve: ServiceFunction<object, T, object>;
      // undefined
      closeValve: ServiceFunction<object, T, object>;
      // undefined
      setValvePosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopValve: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    select: {
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: unknown;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
    };
    humidifier: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      setMode: ServiceFunction<
        object,
        T,
        {
          //  @example away @constraints  state: attribute: mode, multiple: false
          mode: unknown;
        }
      >;
      // undefined
      setHumidity: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          humidity: number;
        }
      >;
    };
    lock: {
      // undefined
      unlock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      lock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      open: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    waterHeater: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      setAwayMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          away_mode: boolean;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.5, mode: box, unit_of_measurement: °
          temperature: number;
          //  @example eco @constraints  state: hide_states: unavailable,unknown, multiple: false
          operation_mode?: unknown;
        }
      >;
      // undefined
      setOperationMode: ServiceFunction<
        object,
        T,
        {
          //  @example eco @constraints  state: hide_states: unavailable,unknown, multiple: false
          operation_mode: unknown;
        }
      >;
    };
    alarmControlPanel: {
      // undefined
      alarmDisarm: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmHome: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmAway: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmNight: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmVacation: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmCustomBypass: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmTrigger: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    logbook: {
      // undefined
      log: ServiceFunction<
        object,
        T,
        {
          //  @example Kitchen
          name: string;
          //  @example is being used
          message: string;
          //
          entity_id?: string;
          //  @example light
          domain?: string;
        }
      >;
    };
    inputButton: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    zone: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    timer: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00 or 60 @constraints  duration: enable_second: true
          duration?: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      cancel: ServiceFunction<object, T, object>;
      // undefined
      finish: ServiceFunction<object, T, object>;
      // undefined
      change: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00, 60 or -60 @constraints  duration: allow_negative: true, enable_second: true
          duration: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
    };
    inputNumber: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.001, mode: box
          value: number;
        }
      >;
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
    };
    inputBoolean: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    inputSelect: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: unknown;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      setOptions: ServiceFunction<
        object,
        T,
        {
          //  @example ['Item A', 'Item B', 'Item C']
          options: string;
        }
      >;
    };
    person: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    deviceTracker: {
      // undefined
      see: ServiceFunction<
        object,
        T,
        {
          //  @example FF:FF:FF:FF:FF:FF
          mac?: string;
          //  @example phonedave
          dev_id?: string;
          //  @example Dave
          host_name?: string;
          //  @example home
          location_name?: string;
          //  @example [51.509802, -0.086692] @constraints  object: multiple: false
          gps?: object;
          //  @constraints  number: min: 0, mode: box, unit_of_measurement: m, step: 1
          gps_accuracy?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          battery?: number;
        }
      >;
    };
    date: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 2022/11/01 @constraints  date:
          date: string;
        }
      >;
    };
    aiTask: {
      // undefined
      generateData: ServiceFunction<
        object,
        T,
        {
          //  @example home summary
          task_name: string;
          //  @example Generate a funny notification that the garage door was left open
          instructions: string;
          //
          entity_id?: string;
          //  @example { 'name': { 'selector': { 'text': }, 'description': 'Name of the user', 'required': 'True' } } }, 'age': { 'selector': { 'number': }, 'description': 'Age of the user' } } @constraints  object: multiple: false
          structure?: object;
          //  @constraints  media: accept: *, multiple: true
          attachments?: unknown;
        }
      >;
      // undefined
      generateImage: ServiceFunction<
        object,
        T,
        {
          //  @example picture of a dog
          task_name: string;
          //  @example Generate a high quality square image of a dog on transparent background
          instructions: string;
          //
          entity_id: string;
          //  @constraints  media: accept: *, multiple: true
          attachments?: unknown;
        }
      >;
    };
    image: {
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/image_snapshot.jpg
          filename: string;
        }
      >;
    };
    datetime: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 2023-10-07T21:35:22 @constraints  datetime:
          datetime: string;
        }
      >;
    };
    text: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example Hello world!
          value: string;
        }
      >;
    };
    assistSatellite: {
      // undefined
      announce: ServiceFunction<
        object,
        T,
        {
          //  @example Time to wake up!
          message?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          media_id?: unknown;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: unknown;
        }
      >;
      // undefined
      startConversation: ServiceFunction<
        object,
        T,
        {
          //  @example You left the lights on in the living room. Turn them off?
          start_message?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          start_media_id?: unknown;
          //
          extra_system_prompt?: string;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: unknown;
        }
      >;
      // undefined
      askQuestion: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example What kind of music would you like to play?
          question?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          question_media_id?: unknown;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: unknown;
          //  @constraints  object: label_field: sentences, description_field: id, multiple: true, translation_key: answers, fields: [object Object]
          answers?: object;
        }
      >;
    };
    time: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 22:15 @constraints  time:
          time: string;
        }
      >;
    };
    siren: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example fire
          tone?: string;
          //  @example 0.5 @constraints  number: min: 0, max: 1, step: 0.05, mode: slider
          volume_level?: number;
          //  @example 15
          duration?: string;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    file: {
      // undefined
      readFile: ServiceFunction<
        object,
        T,
        {
          //  @example www/my_file.json
          file_name?: string;
          //  @example JSON
          file_encoding?: 'JSON' | 'YAML';
        }
      >;
    };
    vesync: {
      // undefined
      updateDevices: ServiceFunction<object, T, object>;
    };
    inputText: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example This is an example text
          value: string;
        }
      >;
    };
    counter: {
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
      // undefined
      reset: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          value: number;
        }
      >;
    };
    schedule: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      getSchedule: ServiceFunction<object, T, object>;
    };
    localtuya: {
      // Reload localtuya and reconnect to all devices.
      reload: ServiceFunction<object, T, object>;
      // Change the value of a datapoint (DP)
      setDp: ServiceFunction<
        object,
        T,
        {
          // Device ID of device to change datapoint value for @example 11100118278aab4de001
          device_id?: object;
          // Datapoint index @example 1
          dp?: object;
          // New value to set
          value?: object;
        }
      >;
    };
    ecovacs: {
      // undefined
      rawGetPositions: ServiceFunction<object, T, object>;
    };
    browserMod: {
      // Run a sequence of services
      sequence: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // List of services to run @constraints  object: multiple: false
          sequence?: object;
        }
      >;
      // Wait for a time
      delay: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Time to wait (ms) @constraints  number: mode: box, step: 1
          time?: number;
        }
      >;
      // Display a popup
      popup: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // ID of the popup-card to use as a template for the popup
          popup_card_id?: string;
          // Popup title
          title?: string;
          // Use adaptive dialog instead of standard dialog. @constraints  boolean:
          adaptive?: boolean;
          // Allow adaptive dialog to continually change between standard and adaptive mode based on screen size instead of only on open. This can be used to make the popup responsive to screen size changes while open but may cause issues with content or styles. @constraints  boolean:
          adaptive_allow_mode_change?: boolean;
          // Force the popup to always open as a bottom sheet when in adaptive mode. @constraints  boolean:
          adaptive_force_bottom_sheet?: boolean;
          // Popup content (Text or lovelace card configuration) @constraints  object: multiple: false
          content: object;
          // Initial style to apply to the popup
          initial_style?: 'normal' | 'classic' | 'wide' | 'fullscreen';
          // Sequence of styles to cycle through when user taps the title or with browser_mod.set_popup_style service
          style_sequence?: 'initial' | 'normal' | 'classic' | 'wide' | 'fullscreen';
          // Popup styles to apply. Use 'all' to always apply the style. You can add to standard styles or create your own @constraints  object: label_field: style, description_field: include_styles, multiple: true, fields: [object Object]
          popup_styles?: object;
          // Text of the right button
          right_button?: string;
          // Variant of the right button
          right_button_variant?: 'brand' | 'neutral' | 'danger' | 'warning' | 'success';
          // Appearance of the right button
          right_button_appearance?: 'accent' | 'filled' | 'outlined' | 'plain';
          // Action to perform when the right button is pressed @constraints  object: multiple: false
          right_button_action?: object;
          // Text of the left button
          left_button?: string;
          // Variant of the left button
          left_button_variant?: 'brand' | 'neutral' | 'danger' | 'warning' | 'success';
          // Appearance of the left button
          left_button_appearance?: 'accent' | 'filled' | 'outlined' | 'plain';
          // Action to perform when left button is pressed @constraints  object: multiple: false
          left_button_action?: object;
          // Whether the popup can be closed by the user without action @constraints  boolean:
          dismissable?: boolean;
          // Action to perform when popup is dismissed @constraints  object: multiple: false
          dismiss_action?: object;
          // Close the popup automatically on mouse, pointer or keyboard activity @constraints  boolean:
          autoclose?: boolean;
          // Time before closing (ms) @constraints  number: mode: box, step: 1
          timeout?: number;
          // Action to perform when popup is closed by timeout @constraints  object: multiple: false
          timeout_action?: object;
          // Hide timeout progress bar @constraints  boolean:
          timeout_hide_progress?: boolean;
          // Tag for managing multiple popups
          tag?: string;
        }
      >;
      // Show more-info dialog
      moreInfo: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          //
          entity?: string;
          // More-info view to show
          view?: 'info' | 'history' | 'settings' | 'related';
          //  @constraints  boolean:
          large?: boolean;
          //  @constraints  boolean:
          ignore_popup_card?: boolean;
          // Close the more-info dialog if open @constraints  boolean:
          close?: boolean;
        }
      >;
      // Close a popup
      closePopup: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Close all Browser Mod popups on the browser @constraints  boolean:
          all?: boolean;
          // Tag for popup to close when using multiple popups
          tag?: string;
        }
      >;
      // Set the style of a popup
      setPopupStyle: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Set style for all open Browser Mod popups on the browser @constraints  boolean:
          all?: boolean;
          // Tag for popup to set style for when using multiple popups
          tag?: string;
          // Style to apply to the popup
          style?: 'normal' | 'classic' | 'wide' | 'fullscreen';
          // Direction to cycle through style sequence
          direction?: 'forward' | 'back';
        }
      >;
      // Display a short notification
      notification: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Message to display
          message: string;
          // Time before closing (ms) @constraints  number: mode: box, step: 1
          duration?: number;
          // Text of optional action button
          action_text?: string;
          // Action to perform when the action button is pressed @constraints  object: multiple: false
          action?: object;
        }
      >;
      // Navigate browser to a different page
      navigate: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Target path
          path?: string;
        }
      >;
      // Refresh page
      refresh: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
        }
      >;
      // Change browser ID
      changeBrowserId: ServiceFunction<
        object,
        T,
        {
          // Current Browser ID of the browser to change
          current_browser_id?: string;
          // New Browser ID for the browser
          new_browser_id?: string;
          // Register the browser @constraints  boolean:
          register?: boolean;
          // Refresh the browser after changing the ID @constraints  boolean:
          refresh?: boolean;
        }
      >;
      // Change the current theme
      setTheme: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Name of theme or 'auto'
          theme?: string;
          // Dark/light mode
          dark?: 'auto' | 'light' | 'dark';
          // Primary theme color @constraints  color_rgb:
          primaryColor?: unknown;
          // Accent theme color @constraints  color_rgb:
          accentColor?: unknown;
        }
      >;
      // Print text to browser console
      console: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // Text to print
          message?: string;
        }
      >;
      // Run arbitrary JavaScript code
      javascript: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          //
          user_id?: string;
          // JavaScript code to run @constraints  object: multiple: false
          code?: object;
        }
      >;
      // Deregister a browser. Include at leaset one paremeter. Calling wiith either exclude parameter will deregister all browsers except those excluded.
      deregisterBrowser: ServiceFunction<
        object,
        T,
        {
          //
          browser_id?: string;
          // Exclude browser from deregister
          browser_id_exclude?: string;
          // Exclude browsers in area from deregister @constraints  area: multiple: true, entity: [object Object], reorder: false
          area_id_exclude?: unknown;
        }
      >;
    };
    template: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    mqtt: {
      // undefined
      publish: ServiceFunction<
        object,
        T,
        {
          //  @example /homeassistant/hello
          topic: string;
          //  @example The temperature is {{ states('sensor.temperature') }} @constraints  template:
          payload?: unknown;
          //  @constraints  boolean:
          evaluate_payload?: boolean;
          //
          qos?: '0' | '1' | '2';
          //  @constraints  boolean:
          retain?: boolean;
        }
      >;
      // undefined
      dump: ServiceFunction<
        object,
        T,
        {
          //  @example OpenZWave/#
          topic?: string;
          //  @constraints  number: min: 1, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    shoppingList: {
      // undefined
      addItem: ServiceFunction<
        object,
        T,
        {
          //  @example Beer
          name: string;
        }
      >;
      // undefined
      removeItem: ServiceFunction<
        object,
        T,
        {
          //  @example Beer
          name: string;
        }
      >;
      // undefined
      completeItem: ServiceFunction<
        object,
        T,
        {
          //  @example Beer
          name: string;
        }
      >;
      // undefined
      incompleteItem: ServiceFunction<
        object,
        T,
        {
          //  @example Beer
          name: string;
        }
      >;
      // undefined
      completeAll: ServiceFunction<object, T, object>;
      // undefined
      incompleteAll: ServiceFunction<object, T, object>;
      // undefined
      clearCompletedItems: ServiceFunction<object, T, object>;
      // undefined
      sort: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          reverse?: boolean;
        }
      >;
    };
    musicAssistant: {
      // undefined
      search: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: music_assistant
          config_entry_id: unknown;
          //  @example We Are The Champions
          name: string;
          //  @example playlist
          media_type?: 'artist' | 'album' | 'audiobook' | 'playlist' | 'podcast' | 'track' | 'radio';
          //  @example Queen
          artist?: string;
          //  @example News of the world
          album?: string;
          //  @example 25 @constraints  number: min: 1, max: 100, step: 1, mode: slider
          limit?: number;
          //  @example true @constraints  boolean:
          library_only?: boolean;
        }
      >;
      // undefined
      getLibrary: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: music_assistant
          config_entry_id: unknown;
          //  @example playlist
          media_type: 'artist' | 'album' | 'audiobook' | 'playlist' | 'podcast' | 'track' | 'radio';
          //  @example true @constraints  boolean:
          favorite?: boolean;
          //  @example We Are The Champions
          search?: string;
          //  @example 25 @constraints  number: min: 1, max: 500, step: 1, mode: slider
          limit?: number;
          //  @example 25 @constraints  number: min: 1, max: 1000000, step: 1, mode: slider
          offset?: number;
          //  @example random
          order_by?:
            | 'name'
            | 'name_desc'
            | 'sort_name'
            | 'sort_name_desc'
            | 'timestamp_added'
            | 'timestamp_added_desc'
            | 'last_played'
            | 'last_played_desc'
            | 'play_count'
            | 'play_count_desc'
            | 'year'
            | 'year_desc'
            | 'position'
            | 'position_desc'
            | 'artist_name'
            | 'artist_name_desc'
            | 'random'
            | 'random_play_count';
          //  @example single
          album_type?: 'album' | 'single' | 'compilation' | 'ep' | 'unknown';
          //  @example true @constraints  boolean:
          album_artists_only?: boolean;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example spotify://playlist/aabbccddeeff @constraints  object: multiple: false
          media_id: object;
          //  @example playlist
          media_type?: 'artist' | 'album' | 'audiobook' | 'folder' | 'playlist' | 'podcast' | 'track' | 'radio';
          //  @example Queen
          artist?: string;
          //  @example News of the world
          album?: string;
          //
          enqueue?: 'play' | 'replace' | 'next' | 'replace_next' | 'add';
          //  @constraints  boolean:
          radio_mode?: boolean;
        }
      >;
      // undefined
      playAnnouncement: ServiceFunction<
        object,
        T,
        {
          //  @example http://someremotesite.com/doorbell.mp3
          url: string;
          //  @example true @constraints  boolean:
          use_pre_announce?: boolean;
          //  @example http://someremotesite.com/chime.mp3
          pre_announce_url?: string;
          //  @example 75 @constraints  number: min: 1, max: 100, step: 1, mode: slider
          announce_volume?: number;
        }
      >;
      // undefined
      transferQueue: ServiceFunction<
        object,
        T,
        {
          //
          source_player?: string;
          //  @example true @constraints  boolean:
          auto_play?: boolean;
        }
      >;
      // undefined
      getQueue: ServiceFunction<object, T, object>;
    };
    bond: {
      // undefined
      setFanSpeedTrackedState: ServiceFunction<
        object,
        T,
        {
          //  @example fan.living_room_fan
          entity_id: string;
          //  @example 50 @constraints  number: min: 0, max: 100, step: 1, mode: slider
          speed: number;
        }
      >;
      // undefined
      startIncreasingBrightness: ServiceFunction<object, T, object>;
      // undefined
      startDecreasingBrightness: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      setLightBrightnessTrackedState: ServiceFunction<
        object,
        T,
        {
          //  @example light.living_room_lights
          entity_id: string;
          //  @example 50 @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness: number;
        }
      >;
      // undefined
      setLightPowerTrackedState: ServiceFunction<
        object,
        T,
        {
          //  @example light.living_room_lights
          entity_id: string;
          //  @example true @constraints  boolean:
          power_state: boolean;
        }
      >;
      // undefined
      setSwitchPowerTrackedState: ServiceFunction<
        object,
        T,
        {
          //  @example switch.whatever
          entity_id: string;
          //  @example true @constraints  boolean:
          power_state: boolean;
        }
      >;
    };
    matter: {
      // undefined
      waterHeaterBoost: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 60, max: 14400, step: 60, mode: box
          duration: number;
          //  @constraints  boolean:
          emergency_boost?: boolean;
          //  @constraints  number: min: 30, max: 65, step: 1, mode: slider
          temporary_setpoint?: number;
        }
      >;
      // undefined
      setLockUser: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 255, step: 1, mode: box
          user_index?: number;
          //
          user_name?: string;
          //
          user_type?:
            | 'unrestricted_user'
            | 'year_day_schedule_user'
            | 'week_day_schedule_user'
            | 'programming_user'
            | 'non_access_user'
            | 'forced_user'
            | 'disposable_user'
            | 'expiring_user'
            | 'schedule_restricted_user'
            | 'remote_only_user';
          //
          credential_rule?: 'single' | 'dual' | 'tri';
        }
      >;
      // undefined
      clearLockUser: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 65534, step: 1, mode: box
          user_index: number;
        }
      >;
      // undefined
      getLockInfo: ServiceFunction<object, T, object>;
      // undefined
      getLockUsers: ServiceFunction<object, T, object>;
      // undefined
      setLockCredential: ServiceFunction<
        object,
        T,
        {
          //
          credential_type: 'pin' | 'rfid' | 'fingerprint' | 'finger_vein' | 'face';
          //
          credential_data: string;
          //  @constraints  number: min: 0, max: 65534, step: 1, mode: box
          credential_index?: number;
          //  @constraints  number: min: 1, max: 65534, step: 1, mode: box
          user_index?: number;
          //
          user_status?: 'occupied_enabled' | 'occupied_disabled';
          //
          user_type?:
            | 'unrestricted_user'
            | 'year_day_schedule_user'
            | 'week_day_schedule_user'
            | 'programming_user'
            | 'non_access_user'
            | 'forced_user'
            | 'disposable_user'
            | 'expiring_user'
            | 'schedule_restricted_user'
            | 'remote_only_user';
        }
      >;
      // undefined
      clearLockCredential: ServiceFunction<
        object,
        T,
        {
          //
          credential_type: 'pin' | 'rfid' | 'fingerprint' | 'finger_vein' | 'face';
          //  @constraints  number: min: 0, max: 65534, step: 1, mode: box
          credential_index: number;
        }
      >;
      // undefined
      getLockCredentialStatus: ServiceFunction<
        object,
        T,
        {
          //
          credential_type:
            | 'programming_pin'
            | 'pin'
            | 'rfid'
            | 'fingerprint'
            | 'finger_vein'
            | 'face'
            | 'aliro_credential_issuer_key'
            | 'aliro_evictable_endpoint_key'
            | 'aliro_non_evictable_endpoint_key';
          //  @constraints  number: min: 0, max: 65534, step: 1, mode: box
          credential_index: number;
        }
      >;
    };
    cast: {
      // undefined
      showLovelaceView: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example lovelace-cast
          dashboard_path?: string;
          //  @example downstairs
          view_path: string;
        }
      >;
    };
    inputDatetime: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setDatetime: ServiceFunction<
        object,
        T,
        {
          //  @example '2019-04-20'
          date?: string;
          //  @example '05:04:20' @constraints  time:
          time?: string;
          //  @example '2019-04-20 05:04:20'
          datetime?: string;
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          timestamp?: number;
        }
      >;
    };
    litterrobot: {
      // undefined
      setSleepMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          enabled: boolean;
          //  @example '22:30:00' @constraints  time:
          start_time?: string;
        }
      >;
    };
    googleAssistantSdk: {
      // undefined
      sendTextCommand: ServiceFunction<
        object,
        T,
        {
          //  @example turn off kitchen TV
          command?: string;
          //  @example media_player.living_room_speaker
          media_player?: string;
        }
      >;
    };
    todo: {
      // undefined
      addItem: ServiceFunction<
        object,
        T,
        {
          //  @example Submit income tax return
          item: string;
          //  @example 2023-11-17 @constraints  date:
          due_date?: string;
          //  @example 2023-11-17 13:30:00 @constraints  datetime:
          due_datetime?: string;
          //  @example A more complete description of the to-do item than that provided by the summary.
          description?: string;
        }
      >;
      // undefined
      updateItem: ServiceFunction<
        object,
        T,
        {
          //  @example Submit income tax return
          item: string;
          //  @example Something else
          rename?: string;
          //  @example needs_action
          status?: 'needs_action' | 'completed';
          //  @example 2023-11-17 @constraints  date:
          due_date?: string;
          //  @example 2023-11-17 13:30:00 @constraints  datetime:
          due_datetime?: string;
          //  @example A more complete description of the to-do item than that provided by the summary.
          description?: string;
        }
      >;
      // undefined
      removeItem: ServiceFunction<
        object,
        T,
        {
          //  @example Submit income tax return
          item: string;
        }
      >;
      // undefined
      getItems: ServiceFunction<
        object,
        T,
        {
          //  @example needs_action
          status?: 'needs_action' | 'completed';
        }
      >;
      // undefined
      removeCompletedItems: ServiceFunction<object, T, object>;
    };
    bhyve: {
      // Update a program's configuration. Provide at least one of start_times, frequency or budget
      updateProgram: ServiceFunction<
        object,
        T,
        {
          // Program switch @example switch.front_yard_program
          entity_id?: object;
          // List of watering start times in HH:MM format @example ['06:00', '18:00']
          start_times?: object;
          // Frequency configuration. `type` is required (known values: days, interval) @example {'type': 'days', 'days': [1, 3, 5], 'interval': 1, 'interval_hours': 0}
          frequency?: object;
          // Watering budget as a percentage (0-200). Scales run times up or down @example 50
          budget?: object;
        }
      >;
      // Enable rain delay for a zone
      enableRainDelay: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
          // Number of hours of rain delay @example 24
          hours?: object;
        }
      >;
      // Disable rain delay for a zone
      disableRainDelay: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
        }
      >;
      // Start watering a zone
      startWatering: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
          // Number of minutes to water the zone @example 15
          minutes?: object;
        }
      >;
      // Stop watering a zone
      stopWatering: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
        }
      >;
      // Set the manual preset runtime for a device entity
      setManualPresetRuntime: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
          // Number of minutes to set the preset runtime @example 15
          minutes?: object;
        }
      >;
      // Set the smart watering soil moisture level for a zone
      setSmartWateringSoilMoisture: ServiceFunction<
        object,
        T,
        {
          // Zone @example valve.backyard_zone
          entity_id?: object;
          // Moisture level between 0 - 100 (percent) @example 50
          percentage?: object;
        }
      >;
      // Begin watering a program
      startProgram: ServiceFunction<
        object,
        T,
        {
          // Program @example valve.backyard_zone
          entity_id?: object;
        }
      >;
    };
    openweathermap: {
      // undefined
      getMinuteForecast: ServiceFunction<object, T, object>;
    };
    ecobee: {
      // undefined
      createVacation: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example Skiing
          vacation_name: string;
          //  @constraints  number: min: 7, max: 95, step: 0.5, unit_of_measurement: °, mode: slider
          cool_temp: number;
          //  @constraints  number: min: 7, max: 95, step: 0.5, unit_of_measurement: °, mode: slider
          heat_temp: number;
          //  @example 2019-03-15
          start_date?: string;
          //  @example 20:00:00 @constraints  time:
          start_time?: string;
          //  @example 2019-03-20
          end_date?: string;
          //  @example 20:00:00 @constraints  time:
          end_time?: string;
          //
          fan_mode?: 'on' | 'auto';
          //  @constraints  number: min: 0, max: 60, unit_of_measurement: minutes, step: 1, mode: slider
          fan_min_on_time?: number;
        }
      >;
      // undefined
      deleteVacation: ServiceFunction<
        object,
        T,
        {
          //  @example climate.kitchen
          entity_id: string;
          //  @example Skiing
          vacation_name: string;
        }
      >;
      // undefined
      setFanMinOnTime: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  number: min: 0, max: 60, unit_of_measurement: minutes, step: 1, mode: slider
          fan_min_on_time: number;
        }
      >;
      // undefined
      resumeProgram: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  boolean:
          resume_all?: boolean;
        }
      >;
      // undefined
      setDstMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          dst_enabled: boolean;
        }
      >;
      // undefined
      setMicMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          mic_enabled: boolean;
        }
      >;
      // undefined
      setOccupancyModes: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          auto_away?: boolean;
          //  @constraints  boolean:
          follow_me?: boolean;
        }
      >;
      // undefined
      setSensorsUsedInClimate: ServiceFunction<
        object,
        T,
        {
          //  @example Home
          preset_mode?: string;
          //
          device_ids: string;
        }
      >;
    };
    calendar: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Department Party
          summary: string;
          //  @example Meeting to provide technical review for 'Phoenix' design.
          description?: string;
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @example 2022-03-22 @constraints  date:
          start_date?: string;
          //  @example 2022-03-23 @constraints  date:
          end_date?: string;
          //  @example {'days': 2} or {'weeks': 2}
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
      // undefined
      getEvents: ServiceFunction<
        object,
        T,
        {
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @constraints  duration: enable_second: true
          duration?: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
    };
    script: {
      //
      goodNight: ServiceFunction<object, T, object>;
      //
      livingRoomMovieMode: ServiceFunction<object, T, object>;
      //
      livingRoomRelaxMode: ServiceFunction<object, T, object>;
      //
      turnOffAllTvs: ServiceFunction<object, T, object>;
      //
      thermostatHomeSleep: ServiceFunction<object, T, object>;
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      //
      notificationGroceryList: ServiceFunction<
        object,
        T,
        {
          //
          person_entity?: string;
          //
          trigger_zone?: string;
        }
      >;
    };
    google: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Bowling
          summary: string;
          //  @example Birthday bowling
          description?: string;
          //  @example 2022-03-22 20:00:00
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00
          end_date_time?: string;
          //  @example 2022-03-10
          start_date?: string;
          //  @example 2022-03-11
          end_date?: string;
          //  @example 'days': 2 or 'weeks': 2 @constraints  object: multiple: false
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
    };
    switchbot: {
      // undefined
      addPassword: ServiceFunction<
        object,
        T,
        {
          //  @example c2d01328efd261f586e56d914e3af07e
          device_id: string;
          //  @example 123456
          password: string;
        }
      >;
    };
    fullyKiosk: {
      // undefined
      loadUrl: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example https://home-assistant.io
          url: string;
        }
      >;
      // undefined
      startApplication: ServiceFunction<
        object,
        T,
        {
          //  @example de.ozerov.fully
          application: string;
          //
          device_id: string;
        }
      >;
      // undefined
      setConfig: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example motionSensitivity
          key: string;
          //  @example 90
          value: string;
        }
      >;
    };
    bambuLab: {
      // Send an arbitrary gcode command to the 3D printer
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The command to send to the printer. Must have a trailing new line. @example M104 S200
          command: string;
        }
      >;
      // Print sliced 3MF file stored on the SD card
      printProjectFile: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // Filename on SD card @example cache/filename.3mf
          filepath: string;
          //  @constraints  number: mode: box, min: 1, max: 100, step: 1
          plate: number;
          //  @constraints  boolean:
          timelapse: boolean;
          //  @constraints  boolean:
          bed_leveling: boolean;
          //  @constraints  boolean:
          flow_cali: boolean;
          //  @constraints  boolean:
          vibration_cali: boolean;
          //  @constraints  boolean:
          layer_inspect: boolean;
          //  @constraints  boolean:
          use_ams: boolean;
          // https://community.home-assistant.io/t/bambu-lab-x1-x1c-mqtt/489510/738 @example 2,-1,0
          ams_mapping: string;
        }
      >;
      // Skip objects currently being printed
      skipObjects: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // Object IDs are available from printable objects entity attributes @example 409,1463
          objects: string;
        }
      >;
      // Move the printhead or bed
      moveAxis: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The axis to move. X/P/H printers, X and Y move the printhead, Z moves the bed. A1, X moves the printhead, Y the bed, Z moves the gantry. @example X
          axis: 'X' | 'Y' | 'Z' | 'Home';
          // The distance (in mm) to move the axis A negative distance moves Z up, X left, Y forward. @example 10 @constraints  number: min: -100, max: 100, step: 1, mode: slider
          distance?: number;
        }
      >;
      // Unload the filament currently loaded into the extruder
      unloadFilament: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
        }
      >;
      // Load a new filament into the extruder passed an AMS tray or an External spool entity
      loadFilament: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          // Target nozzle temperature once the filament is loaded. By default uses the midpoint between min and max temperature of the chosen filament. @example 220 @constraints  number: min: 0, max: 250, step: 1, mode: slider
          temperature?: number;
        }
      >;
      // Retry loading external filament
      retryLoadFilament: ServiceFunction<object, T, object>;
      // Once loading external filament is done, use this action to signal that to the printer.
      doneLoadFilament: ServiceFunction<object, T, object>;
      // Perform an extrusion or extraction of the loaded filament
      extrudeRetract: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The type of extrude action to perform @example Extrude
          type: 'Extrude' | 'Retract';
          // Perform extrusion or retraction if nozzle temperature is below 170ºC. @constraints  boolean:
          force?: boolean;
        }
      >;
      // Sets filament details on an AMS tray or an External spool entity
      setFilament: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          // Bambu's filament ID. E.g. GFL96 is Generic PLA Silk @example GFL96
          tray_info_idx: string;
          // RGBA value for the color. E.g. FF0000FF is opaque red. @example FF0000FF
          tray_color: string;
          // Type of filament. E.g. 'PLA' or 'PETG' @example PLA
          tray_type: string;
          // The minimum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1, mode: slider
          nozzle_temp_min: number;
          // The maximum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1, mode: slider
          nozzle_temp_max: number;
        }
      >;
      // Gets a json string with details about all known filaments
      getFilamentData: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
        }
      >;
      // Triggers the AMS to attempt to re-read the RFID tag on the current spool.
      readRfid: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
        }
      >;
      // Starts AMS filament drying.
      startFilamentDrying: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // AMS 2 max is 65C. AMS HT max is 85C. @example 45 @constraints  number: min: 45, max: 85, step: 1, mode: slider
          temp: number;
          //  @constraints  boolean:
          rotate_tray: boolean;
          //  @constraints  number: min: 1, max: 24, step: 1, mode: slider
          duration: number;
        }
      >;
      // Stops AMS filament drying.
      stopFilamentDrying: ServiceFunction<
        object,
        T,
        {
          // Select the AMS 2 or AMS HT device to stop drying on.
          device_id: string;
        }
      >;
    };
    teslaCustom: {
      // Run an API command using controller.api. https://teslajsonpy.readthedocs.io/en/latest/teslajsonpy/teslajsonpy.html#teslajsonpy.Controller.api
      api: ServiceFunction<
        object,
        T,
        {
          // Email address (optional if only one account) @example elon@tesla.com
          email?: string;
          // Command to run. See https://github.com/zabuldon/teslajsonpy/blob/master/teslajsonpy/endpoints.json @example WAKE_UP
          command: string;
          // Parameters in a dictionary. `path_vars` replace variables in endpoints.json path. All others are passed directly to controller.api. For command parameters see https://tesla-api.timdorr.com/vehicle/commands. @example {'path_vars': {'vehicle_id':'1'}, 'wake_if_asleep':True} @constraints  object: multiple: false
          parameters: object;
        }
      >;
      // Set polling interval for updating fresh data from an awake car
      pollingInterval: ServiceFunction<
        object,
        T,
        {
          // Email address (optional if only one account) @example elon@tesla.com
          email?: string;
          // Vehicle VIN (if not provided then default polling interval will be updated) @example 5YJSA11111111111
          vin?: string;
          // Number of seconds between each poll.  See https://github.com/alandtse/tesla/wiki/Polling-policy more information. @example 660 @constraints  number: min: -1, max: 3600, step: 30, unit_of_measurement: s, mode: slider
          scan_interval: number;
        }
      >;
    };
    simplisafe: {
      // undefined
      removePin: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example Test PIN
          label_or_pin: string;
        }
      >;
      // undefined
      setPin: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example Test PIN
          label: string;
          //  @example 1256
          pin: string;
        }
      >;
      // undefined
      setSystemProperties: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @constraints  number: min: 30, max: 480, unit_of_measurement: seconds, step: 1, mode: slider
          alarm_duration?: number;
          //
          alarm_volume?: 'low' | 'medium' | 'high' | 'off';
          //
          chime_volume?: 'low' | 'medium' | 'high' | 'off';
          //  @constraints  number: min: 30, max: 255, unit_of_measurement: seconds, step: 1, mode: slider
          entry_delay_away?: number;
          //  @constraints  number: min: 0, max: 255, unit_of_measurement: seconds, step: 1, mode: slider
          entry_delay_home?: number;
          //  @constraints  number: min: 45, max: 255, unit_of_measurement: seconds, step: 1, mode: slider
          exit_delay_away?: number;
          //  @constraints  number: min: 0, max: 255, unit_of_measurement: seconds, step: 1, mode: slider
          exit_delay_home?: number;
          //  @constraints  boolean:
          light?: boolean;
          //
          voice_prompt_volume?: 'low' | 'medium' | 'high' | 'off';
        }
      >;
    };
    sonos: {
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  boolean:
          with_group?: boolean;
        }
      >;
      // undefined
      restore: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  boolean:
          with_group?: boolean;
        }
      >;
      // undefined
      setSleepTimer: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 7200, unit_of_measurement: seconds, step: 1, mode: slider
          sleep_time?: number;
        }
      >;
      // undefined
      clearSleepTimer: ServiceFunction<object, T, object>;
      // undefined
      updateAlarm: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 1440, mode: box, step: 1
          alarm_id: number;
          //  @example 07:00 @constraints  time:
          time?: string;
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          volume?: number;
          //  @constraints  boolean:
          enabled?: boolean;
          //  @constraints  boolean:
          include_linked_zones?: boolean;
        }
      >;
      // undefined
      playQueue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 10000, mode: box, step: 1
          queue_position?: number;
        }
      >;
      // undefined
      removeFromQueue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 10000, mode: box, step: 1
          queue_position?: number;
        }
      >;
      // undefined
      getQueue: ServiceFunction<object, T, object>;
    };
    automation: {
      // undefined
      trigger: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          skip_condition?: boolean;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          stop_actions?: boolean;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    tryfi: {
      // Set the color of the pet's collar LED
      setLedColor: ServiceFunction<
        object,
        T,
        {
          // The color to set (red, green, blue, yellow, magenta, cyan, orange, white)
          color: 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'orange' | 'white';
        }
      >;
      // Turn on the pet's collar LED
      turnOnLed: ServiceFunction<object, T, object>;
      // Turn off the pet's collar LED
      turnOffLed: ServiceFunction<object, T, object>;
      // Enable or disable lost dog mode for a pet
      setLostMode: ServiceFunction<
        object,
        T,
        {
          // Lost mode state
          mode: 'Safe' | 'Lost';
        }
      >;
      // Set the geographic location of a TryFi WiFi network
      setWifiLocation: ServiceFunction<
        object,
        T,
        {
          // The WiFi network SSID
          ssid: string;
          // Latitude of the WiFi network location @constraints  number: min: -90, max: 90, step: 0.001, mode: box
          latitude: number;
          // Longitude of the WiFi network location @constraints  number: min: -180, max: 180, step: 0.001, mode: box
          longitude: number;
        }
      >;
    };
    frigate: {
      // Export a custom recording or timelapse.
      exportRecording: ServiceFunction<
        object,
        T,
        {
          // Playback factor for recordings @example realtime
          playback_factor: 'realtime' | 'timelapse_25x';
          // Start time of exported recording @constraints  datetime:
          start_time: string;
          // End time of exported recording @constraints  datetime:
          end_time: string;
          // Optional name for the exported recording. If not provided, the API will generate one.
          name?: string;
        }
      >;
      // Favorites or unfavorites an event. Favorited events are retained indefinitely.
      favoriteEvent: ServiceFunction<
        object,
        T,
        {
          // ID of the event to favorite or unfavorite. @example 1656510950.19548-ihtjj7
          event_id: string;
          // If the event should be favorited or unfavorited. Enable to favorite, disable to unfavorite.  @example true @constraints  boolean:
          favorite?: boolean;
        }
      >;
      // Pan / Tilt, Zoom, or move a camera to a preset
      ptz: ServiceFunction<
        object,
        T,
        {
          // Type of PTZ action @example move
          action: 'move' | 'preset' | 'stop' | 'zoom';
          // left, right, up, down for move; in, out for zoom; name of preset  @example down
          argument?: string;
        }
      >;
      // Create a manual event with a given label for a camera.
      createEvent: ServiceFunction<
        object,
        T,
        {
          // Label for the event @example Doorbell press
          label: string;
          // Sub label for the event @example Front door
          sub_label?: string;
          // Predetermined length of event. Default is 30 seconds. Use 0 for indefinite.  @example 30 @constraints  number: min: 0, max: 300, step: 1, mode: slider
          duration?: number;
          // Whether the event should save recordings along with the snapshot that is taken.  @example true @constraints  boolean:
          include_recording?: boolean;
        }
      >;
      // End a manual event with a given id for a camera.
      endEvent: ServiceFunction<
        object,
        T,
        {
          // ID of the event to end. @example 1656510950.19548-ihtjj7
          event_id: string;
        }
      >;
      // Get a summary of review items for a specified time period. Only available in Frigate 0.17+.
      reviewSummarize: ServiceFunction<
        object,
        T,
        {
          // Start time for the review period @constraints  datetime:
          start_time: string;
          // End time for the review period @constraints  datetime:
          end_time: string;
        }
      >;
    };
  }
  export interface CustomEntityNameContainer {
    names:
      | 'binary_sensor.frigate_proxy_running'
      | 'update.home_assistant_supervisor_update'
      | 'update.home_assistant_core_update'
      | 'update.studio_code_server_update'
      | 'update.ssh_web_terminal_update'
      | 'update.home_assistant_google_drive_backup_update'
      | 'update.esphome_update'
      | 'update.mosquitto_broker_update'
      | 'update.silicon_labs_multiprotocol_update'
      | 'update.matter_server_update'
      | 'update.music_assistant_server_update'
      | 'update.frigate_proxy_update'
      | 'update.home_assistant_operating_system_update'
      | 'conversation.home_assistant'
      | 'sensor.frigate_proxy_version'
      | 'sensor.frigate_proxy_newest_version'
      | 'sensor.frigate_proxy_cpu_percent'
      | 'sensor.frigate_proxy_memory_percent'
      | 'sensor.time'
      | 'sensor.date'
      | 'light.master_bedroom_lamps'
      | 'event.backup_automatic_backup'
      | 'sensor.backup_backup_manager_state'
      | 'sensor.backup_next_scheduled_automatic_backup'
      | 'sensor.backup_last_successful_automatic_backup'
      | 'sensor.backup_last_attempted_automatic_backup'
      | 'binary_sensor.remote_ui'
      | 'stt.home_assistant_cloud'
      | 'tts.home_assistant_cloud'
      | 'scene.evening_lights'
      | 'scene.aay'
      | 'scene.evening_lights_2'
      | 'scene.all_lights_off'
      | 'scene.game_mode'
      | 'cover.living_room_blinds'
      | 'cover.second_floor_blinds'
      | 'cover.master_bedroom_blinds'
      | 'cover.all_blinds'
      | 'light.kitchen_lights'
      | 'light.first_floor_lights'
      | 'light.second_floor_lights'
      | 'light.kitchen_and_dining_room_lights'
      | 'light.third_floor_lights'
      | 'light.all_lights'
      | 'light.master_bedroom'
      | 'binary_sensor.windows_first_floor'
      | 'binary_sensor.windows_all_windows'
      | 'binary_sensor.doors_first_floor'
      | 'binary_sensor.doors_all_doors'
      | 'binary_sensor.smoke_all'
      | 'cover.third_floor_blinds'
      | 'light.game_room_stick_lights'
      | 'tts.google_en_com'
      | 'zone.mitchell_work'
      | 'zone.snodgrass_house'
      | 'zone.pillar_house'
      | 'zone.the_lodge'
      | 'zone.cory_s_house'
      | 'zone.jerry_s_house'
      | 'zone.school_hwes'
      | 'zone.ruggles_golf_course'
      | 'zone.elaina_denny_s_house'
      | 'zone.nate_s_house'
      | 'zone.shoprite'
      | 'zone.target'
      | 'zone.wegmans'
      | 'timer.washer_tag'
      | 'timer.dryer_tag'
      | 'input_number.master_bedroom_ceiling_fan_brightness'
      | 'input_number.master_bedroom_ceiling_fan_temp'
      | 'input_boolean.company_over_kill_switch'
      | 'input_boolean.vacuum_ran'
      | 'input_boolean.tesla_scarlett'
      | 'input_boolean.tesla_freya'
      | 'input_boolean.vacuum_second_floor'
      | 'input_boolean.vacuum_first_floor'
      | 'input_boolean.desktop_therm_charts'
      | 'input_boolean.status_sleeping'
      | 'input_boolean.kitchen_speakers_menu'
      | 'input_boolean.rx_stereo_volume'
      | 'input_select.house_mode'
      | 'input_select.kitchen_speakers_menu_list'
      | 'zone.home'
      | 'person.mitchell'
      | 'person.michelle'
      | 'person.ryan'
      | 'sun.sun'
      | 'sensor.sun_next_dawn'
      | 'sensor.sun_next_dusk'
      | 'sensor.sun_next_midnight'
      | 'sensor.sun_next_noon'
      | 'sensor.sun_next_rising'
      | 'sensor.sun_next_setting'
      | 'light.master_bedroom_ceiling_fan_white'
      | 'light.master_bedroom_ceiling_fan_yellow'
      | 'fan.master_bedroom_ceiling_fan'
      | 'sensor.home_uv_level'
      | 'sensor.safe_exposure_limit'
      | 'binary_sensor.mitchell_almost_home'
      | 'binary_sensor.michelle_almost_home'
      | 'sensor.family_home_away'
      | 'sensor.hvac_state'
      | 'sensor.gym_air_quality_2'
      | 'sensor.ryan_air_quality'
      | 'sensor.second_floor_air_quality_2'
      | 'sensor.ragweed_simple'
      | 'sensor.tree_simple'
      | 'sensor.grass_simple'
      | 'light.master_bedroom_ceiling_fan'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_id'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_path'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_visibility'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_useragent'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_user'
      | 'binary_sensor.browser_mod_4cbb02a8_7714abe9_browser_fullykiosk'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_width'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_height'
      | 'binary_sensor.browser_mod_4cbb02a8_7714abe9_browser_dark_mode'
      | 'binary_sensor.browser_mod_4cbb02a8_7714abe9'
      | 'light.browser_mod_4cbb02a8_7714abe9_screen'
      | 'media_player.browser_mod_4cbb02a8_7714abe9'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_panel'
      | 'sensor.browser_mod_4cbb02a8_7714abe9_browser_battery'
      | 'binary_sensor.browser_mod_4cbb02a8_7714abe9_browser_charging'
      | 'camera.octoprint'
      | 'sensor.stats_hvac_runtime_24_hours'
      | 'input_datetime.date'
      | 'sensor.daily_from_grid_cost'
      | 'sensor.stats_hvac_runtime_7_days'
      | 'binary_sensor.ryans_iphone_focus'
      | 'device_tracker.ryans_iphone'
      | 'sensor.ryans_iphone_activity'
      | 'sensor.ryans_iphone_average_active_pace'
      | 'sensor.ryans_iphone_bssid'
      | 'sensor.ryans_iphone_battery_level'
      | 'sensor.ryans_iphone_battery_state'
      | 'sensor.ryans_iphone_connection_type'
      | 'sensor.ryans_iphone_distance'
      | 'sensor.ryans_iphone_floors_ascended'
      | 'sensor.ryans_iphone_floors_descended'
      | 'sensor.ryans_iphone_geocoded_location'
      | 'sensor.ryans_iphone_last_update_trigger'
      | 'sensor.ryans_iphone_sim_1'
      | 'sensor.ryans_iphone_sim_2'
      | 'sensor.ryans_iphone_ssid'
      | 'sensor.ryans_iphone_steps'
      | 'sensor.ryans_iphone_storage'
      | 'sensor.iphone_watch_battery'
      | 'sensor.iphone_app_version'
      | 'sensor.iphone_location_permission'
      | 'sensor.iphone_watch_battery_state'
      | 'sensor.iphone_audio_output'
      | 'binary_sensor.michelle_s_iphone_focus'
      | 'device_tracker.michelle_s_iphone'
      | 'sensor.michelle_s_iphone_connection_type'
      | 'sensor.michelle_s_iphone_bssid'
      | 'sensor.michelle_s_iphone_ssid'
      | 'sensor.michelle_s_iphone_battery_level'
      | 'sensor.michelle_s_iphone_storage'
      | 'sensor.michelle_s_iphone_geocoded_location'
      | 'sensor.michelle_s_iphone_sim_1'
      | 'sensor.michelle_s_iphone_last_update_trigger'
      | 'sensor.michelle_s_iphone_sim_2'
      | 'sensor.michelle_s_iphone_battery_state'
      | 'sensor.michelle_s_iphone_activity'
      | 'sensor.michelle_s_iphone_distance'
      | 'sensor.michelle_s_iphone_floors_descended'
      | 'sensor.michelle_s_iphone_floors_ascended'
      | 'sensor.michelle_s_iphone_steps'
      | 'sensor.michelle_s_iphone_average_active_pace'
      | 'sensor.michelle_s_iphone_watch_battery'
      | 'sensor.michelle_s_iphone_app_version'
      | 'sensor.michelle_s_iphone_location_permission'
      | 'sensor.michelle_s_iphone_audio_output'
      | 'device_tracker.mitchells_ipad_2'
      | 'sensor.mitchells_ipad_battery_level'
      | 'sensor.mitchells_ipad_battery_state'
      | 'sensor.mitchells_ipad_bssid'
      | 'sensor.mitchells_ipad_connection_type'
      | 'sensor.mitchells_ipad_last_update_trigger'
      | 'sensor.mitchells_ipad_ssid'
      | 'sensor.mitchells_ipad_storage'
      | 'sensor.ipad_mitchell_location_permission'
      | 'sensor.ipad_mitchell_app_version'
      | 'sensor.ipad_mitchell_audio_output'
      | 'binary_sensor.michelles_ipad_focus'
      | 'device_tracker.michelles_ipad'
      | 'sensor.michelles_ipad_battery_level'
      | 'sensor.michelles_ipad_ssid'
      | 'sensor.michelles_ipad_bssid'
      | 'sensor.michelles_ipad_geocoded_location'
      | 'sensor.michelles_ipad_storage'
      | 'sensor.michelles_ipad_connection_type'
      | 'sensor.michelles_ipad_last_update_trigger'
      | 'sensor.michelles_ipad_battery_state'
      | 'sensor.michelles_ipad_activity'
      | 'binary_sensor.mitchells_iphone_focus'
      | 'device_tracker.mitchells_iphone'
      | 'sensor.mitchells_iphone_distance'
      | 'sensor.mitchells_iphone_storage'
      | 'sensor.mitchells_iphone_ssid'
      | 'sensor.mitchells_iphone_activity'
      | 'sensor.mitchells_iphone_battery_state'
      | 'sensor.mitchells_iphone_battery_level'
      | 'sensor.mitchells_iphone_floors_ascended'
      | 'sensor.mitchells_iphone_steps'
      | 'sensor.mitchells_iphone_floors_descended'
      | 'sensor.mitchells_iphone_bssid'
      | 'sensor.mitchells_iphone_average_active_pace'
      | 'sensor.mitchells_iphone_sim_1'
      | 'sensor.mitchells_iphone_geocoded_location'
      | 'sensor.mitchells_iphone_connection_type'
      | 'sensor.mitchells_iphone_sim_2'
      | 'sensor.mitchells_iphone_last_update_trigger'
      | 'sensor.mitchells_iphone_app_version'
      | 'sensor.mitchells_iphone_location_permission'
      | 'sensor.mitchells_iphone_audio_output'
      | 'sensor.mitchells_iphone_watch_battery_level'
      | 'sensor.mitchells_iphone_watch_battery_state'
      | 'sensor.co2_intensity'
      | 'sensor.grid_fossil_fuel_percentage'
      | 'binary_sensor.ryan_low_water'
      | 'binary_sensor.ryan_water_tank_lifted'
      | 'binary_sensor.living_room_low_water'
      | 'binary_sensor.living_room_water_tank_lifted'
      | 'fan.second_floor_air_purifier'
      | 'fan.ryans_air_purifier'
      | 'fan.gym_air_purifier'
      | 'humidifier.ryan'
      | 'humidifier.living_room'
      | 'number.ryan_mist_level'
      | 'number.living_room_mist_level'
      | 'select.ryans_air_purifier_night_light_level'
      | 'select.living_room_night_light_level'
      | 'sensor.second_floor_air_purifier_filter_life'
      | 'sensor.second_floor_air_purifier_air_quality'
      | 'sensor.second_floor_air_purifier_pm2_5'
      | 'sensor.ryans_air_purifier_filter_life'
      | 'sensor.gym_air_purifier_filter_life'
      | 'sensor.gym_air_purifier_air_quality'
      | 'sensor.gym_air_purifier_pm2_5'
      | 'sensor.living_room_humidity'
      | 'switch.ryan_display'
      | 'switch.ryan_auto_off'
      | 'switch.second_floor_air_purifier_display'
      | 'switch.second_floor_air_purifier_child_lock'
      | 'switch.ryans_air_purifier_display'
      | 'switch.ryans_air_purifier_child_lock'
      | 'switch.gym_air_purifier_display'
      | 'switch.gym_air_purifier_child_lock'
      | 'switch.living_room_display'
      | 'switch.living_room_auto_off'
      | 'update.ryan_firmware'
      | 'update.second_floor_air_purifier_firmware'
      | 'update.ryans_air_purifier_firmware'
      | 'update.gym_air_purifier_firmware'
      | 'update.living_room_firmware'
      | 'sensor.ryan_humidity'
      | 'binary_sensor.mystery_device_11_power_2'
      | 'binary_sensor.heat_5'
      | 'binary_sensor.device_1_2'
      | 'binary_sensor.device_5'
      | 'binary_sensor.heat_1_2'
      | 'binary_sensor.mystery_heat_12_power'
      | 'binary_sensor.oven_power'
      | 'binary_sensor.mitchell_s_tesla'
      | 'binary_sensor.pump_3'
      | 'binary_sensor.device_3_2'
      | 'binary_sensor.fridge_2_power'
      | 'binary_sensor.mystery_device_11_power'
      | 'binary_sensor.dryer_power'
      | 'binary_sensor.ac_power'
      | 'binary_sensor.dishwasher_2'
      | 'binary_sensor.pump_2'
      | 'binary_sensor.sense_energy_monitor_power'
      | 'binary_sensor.always_on'
      | 'binary_sensor.mystery_motor_13_power'
      | 'binary_sensor.motor_2_3'
      | 'binary_sensor.mystery_device_10'
      | 'binary_sensor.electric_vehicle_power'
      | 'binary_sensor.motor_3_3'
      | 'binary_sensor.ac_2_2'
      | 'binary_sensor.fridge_2'
      | 'binary_sensor.heat_3_2'
      | 'binary_sensor.microwave_3'
      | 'binary_sensor.other'
      | 'event.jb_weather'
      | 'todo.shopping_list'
      | 'binary_sensor.eero_wan_status'
      | 'sensor.eero_external_ip'
      | 'cover.master_bedroom_1'
      | 'cover.master_bedroom_2'
      | 'cover.living_room_blinds_2'
      | 'cover.living_room_blinds_1'
      | 'cover.kitchen_blinds'
      | 'cover.tradfri_blind_8'
      | 'cover.ryan_s_room_blinds'
      | 'cover.office_blinds'
      | 'sensor.tradfri_open_close_remote'
      | 'sensor.master_bedroom_1'
      | 'sensor.master_bedroom_2'
      | 'sensor.living_room_blinds_2'
      | 'sensor.living_room_blinds_1'
      | 'sensor.kitchen_blinds'
      | 'sensor.tradfri_blind_8_battery'
      | 'sensor.ryans_room_blinds'
      | 'sensor.office_blinds'
      | 'binary_sensor.wi_fi_hub_connected'
      | 'binary_sensor.back_yard_sprinkler_fault'
      | 'select.back_yard_sprinkler_device_mode'
      | 'sensor.back_yard_sprinkler_state'
      | 'sensor.back_yard_sprinkler_next_watering'
      | 'sensor.unknown_zone_history'
      | 'sensor.back_yard_sprinkler_battery_level'
      | 'switch.back_yard_sprinkler_rain_delay'
      | 'switch.back_yard_sprinkler_smart_watering'
      | 'valve.back_yard_sprinkler_zone'
      | 'sensor.openweathermap_weather'
      | 'sensor.openweathermap_dew_point'
      | 'sensor.openweathermap_temperature'
      | 'sensor.openweathermap_feels_like_temperature'
      | 'sensor.openweathermap_wind_speed'
      | 'sensor.openweathermap_wind_gust'
      | 'sensor.openweathermap_wind_bearing'
      | 'sensor.openweathermap_humidity'
      | 'sensor.openweathermap_pressure'
      | 'sensor.openweathermap_cloud_coverage'
      | 'sensor.openweathermap_rain'
      | 'sensor.openweathermap_snow'
      | 'sensor.openweathermap_precipitation_kind'
      | 'sensor.openweathermap_uv_index'
      | 'sensor.openweathermap_visibility'
      | 'sensor.openweathermap_condition'
      | 'sensor.openweathermap_weather_code'
      | 'weather.openweathermap'
      | 'binary_sensor.schedule_bed_time'
      | 'binary_sensor.second_floor_vacuum_mop_attached'
      | 'button.second_floor_vacuum_relocate'
      | 'event.second_floor_vacuum_last_job'
      | 'image.second_floor_vacuum_map'
      | 'select.second_floor_vacuum_water_flow_level'
      | 'select.second_floor_vacuum_active_map'
      | 'sensor.second_floor_vacuum_area_cleaned'
      | 'sensor.second_floor_vacuum_cleaning_duration'
      | 'sensor.second_floor_vacuum_total_area_cleaned'
      | 'sensor.second_floor_vacuum_total_cleaning_duration'
      | 'sensor.second_floor_vacuum_total_cleanings'
      | 'sensor.second_floor_vacuum_battery'
      | 'sensor.second_floor_vacuum_main_brush_lifespan'
      | 'sensor.second_floor_vacuum_filter_lifespan'
      | 'sensor.second_floor_vacuum_round_mop_lifespan'
      | 'sensor.second_floor_vacuum_side_brushes_lifespan'
      | 'sensor.second_floor_vacuum_unit_care_lifespan'
      | 'vacuum.second_floor_vacuum'
      | 'binary_sensor.back_door_entry'
      | 'binary_sensor.back_door_entry_battery'
      | 'binary_sensor.front_door_entry'
      | 'binary_sensor.front_door_entry_battery'
      | 'binary_sensor.garage_entry'
      | 'binary_sensor.garage_entry_battery'
      | 'binary_sensor.patio_window_entry'
      | 'binary_sensor.patio_window_entry_battery'
      | 'binary_sensor.entryway_keypad_battery'
      | 'binary_sensor.kitchen_motion'
      | 'binary_sensor.kitchen_motion_battery'
      | 'button.alarm_control_panel_clear_notifications'
      | 'light.game_room_tv_lights'
      | 'light.h6008'
      | 'button.office_ceiling_fan_start_dimmer'
      | 'button.office_ceiling_fan_stop_actions'
      | 'fan.ryan_s_ceiling_fan_2'
      | 'fan.living_room_ceiling_fan'
      | 'fan.office_ceiling_fan'
      | 'light.ryan_s_ceiling_fan_2'
      | 'light.living_room_ceiling_fan'
      | 'light.office_ceiling_fan'
      | 'media_player.living_room'
      | 'remote.living_room'
      | 'binary_sensor.sleepnumber_m_m_bed_mitchell_is_in_bed'
      | 'binary_sensor.sleepnumber_m_m_bed_michelle_is_in_bed'
      | 'button.sleepnumber_m_m_bed_stop_pump'
      | 'number.sleepnumber_m_m_bed_mitchell_firmness'
      | 'number.sleepnumber_m_m_bed_michelle_firmness'
      | 'sensor.sleepnumber_m_m_bed_mitchell_pressure'
      | 'sensor.sleepnumber_m_m_bed_mitchell_sleepnumber'
      | 'sensor.sleepnumber_m_m_bed_michelle_pressure'
      | 'sensor.sleepnumber_m_m_bed_michelle_sleepnumber'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_mitchell_sleep_score'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_mitchell_sleep_duration'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_mitchell_heart_rate_average'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_mitchell_respiratory_rate_average'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_mitchell_heart_rate_variability'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_michelle_sleep_score'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_michelle_sleep_duration'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_michelle_heart_rate_average'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_michelle_respiratory_rate_average'
      | 'sensor.m_m_bed_sleepnumber_m_m_bed_michelle_heart_rate_variability'
      | 'switch.sleepnumber_m_m_bed_pause_mode'
      | 'binary_sensor.thermostat_occupancy'
      | 'climate.thermostat'
      | 'notify.thermostat'
      | 'sensor.thermostat_temperature'
      | 'sensor.thermostat_humidity'
      | 'sensor.thermostat_air_quality_index'
      | 'sensor.thermostat_voc'
      | 'sensor.thermostat_co2'
      | 'weather.thermostat'
      | 'sensor.weatheralerts_southeast_harford_mdz508_mdc025'
      | 'media_player.family_room'
      | 'light.family_room_main_lights'
      | 'light.entry_way_step_lights'
      | 'light.kitchen_main_lights_1'
      | 'light.dining_room_chandelier'
      | 'light.second_floor_bathroom'
      | 'light.living_room_main_lights'
      | 'light.stairs_step_lights'
      | 'light.upstairs_hallway_main_lights'
      | 'light.kitchen_sink'
      | 'light.master_bathroom_main_lights'
      | 'switch.master_bedroom_lamps'
      | 'switch.unassigned_smart_away'
      | 'media_player.gym_tv'
      | 'remote.gym_tv'
      | 'switch.frigate_pre_release'
      | 'switch.threedy_pre_release'
      | 'update.hacs_update'
      | 'update.light_entity_card_update'
      | 'update.peloton_update'
      | 'update.bambu_lab_update'
      | 'update.slider_entity_row_update'
      | 'update.frigate_update'
      | 'update.bubble_card_update'
      | 'update.auto_reload_update'
      | 'update.paper_buttons_row_update'
      | 'update.meteoalarm_card_update'
      | 'update.fold_entity_row_update'
      | 'update.auto_entities_update'
      | 'update.stack_in_card_update'
      | 'update.sidebar_card_update'
      | 'update.simple_clock_card_update'
      | 'update.mushroom_update'
      | 'update.mini_media_player_update'
      | 'update.music_assistant_player_card_update'
      | 'update.vacuum_card_update'
      | 'update.tesla_update'
      | 'update.local_tuya_update'
      | 'update.frigate_card_update'
      | 'update.frosted_glass_theme_update'
      | 'update.threedy_update'
      | 'update.button_card_update'
      | 'update.browser_mod_update'
      | 'update.vertical_stack_in_card_update'
      | 'update.state_switch_update'
      | 'update.mini_graph_card_update'
      | 'update.weatheralerts_update'
      | 'update.layout_card_update'
      | 'update.my_cards_bundle_update'
      | 'update.entity_progress_card_update'
      | 'update.week_planner_card_update'
      | 'update.atomic_calendar_revive_update'
      | 'update.tryfi_dog_monitor_update'
      | 'update.multiple_entity_row_update'
      | 'update.hui_element_update'
      | 'update.tabbed_card_update'
      | 'update.xiaomi_vacuum_map_card_update'
      | 'update.card_mod_update'
      | 'update.orbit_bhyve_update'
      | 'update.calendar_card_pro_update'
      | 'button.bluetooth_proxy_2nd_floor_safe_mode_boot'
      | 'sensor.air_quality_ryan'
      | 'select.esp32_s3_box_3_d84e10_assistant'
      | 'select.esp32_s3_box_3_d84e10_assistant_2'
      | 'select.esp32_s3_box_3_d84e10_finished_speaking_detection'
      | 'select.esp32_s3_box_3_d84e10_wake_word'
      | 'select.esp32_s3_box_3_d84e10_wake_word_2'
      | 'switch.esp32_s3_box_3_d84e10_mute'
      | 'update.esp32_s3_box_3_d84e10_firmware'
      | 'light.esp32_s3_box_3_d84e10_screen'
      | 'select.esp32_s3_box_3_d84e10_wake_word_engine_location'
      | 'media_player.esp32_s3_box_lite_d84e10'
      | 'media_player.first_floor'
      | 'todo.home'
      | 'binary_sensor.pedro_the_pooper_scooper_power_status'
      | 'button.lr4_beta_reset_2'
      | 'button.pedro_the_pooper_scooper_reset'
      | 'select.lr4_beta_clean_cycle_wait_time_minutes'
      | 'select.lr4_beta_globe_brightness'
      | 'select.lr4_beta_globe_light'
      | 'select.lr4_beta_panel_brightness'
      | 'select.pedro_the_pooper_scooper_clean_cycle_wait_time_minutes'
      | 'select.pedro_the_pooper_scooper_globe_brightness'
      | 'select.pedro_the_pooper_scooper_globe_light'
      | 'select.pedro_the_pooper_scooper_panel_brightness'
      | 'sensor.lr4_beta_waste_drawer'
      | 'sensor.lr4_beta_sleep_mode_start_time'
      | 'sensor.lr4_beta_sleep_mode_end_time'
      | 'sensor.lr4_beta_last_seen'
      | 'sensor.lr4_beta_status_code'
      | 'sensor.lr4_beta_hopper_status'
      | 'sensor.lr4_beta_litter_level'
      | 'sensor.lr4_beta_pet_weight'
      | 'sensor.pedro_the_pooper_scooper_waste_drawer'
      | 'sensor.pedro_the_pooper_scooper_sleep_mode_start_time'
      | 'sensor.pedro_the_pooper_scooper_sleep_mode_end_time'
      | 'sensor.pedro_the_pooper_scooper_last_seen'
      | 'sensor.pedro_the_pooper_scooper_status_code'
      | 'sensor.pedro_the_pooper_scooper_hopper_status'
      | 'sensor.pedro_the_pooper_scooper_litter_level'
      | 'sensor.pedro_the_pooper_scooper_pet_weight'
      | 'sensor.aston_weight'
      | 'sensor.aston_visits_today'
      | 'sensor.mozzie_weight'
      | 'sensor.mozzie_visits_today'
      | 'switch.lr4_beta_panel_lockout'
      | 'switch.pedro_the_pooper_scooper_panel_lockout'
      | 'vacuum.lr4_beta_litter_box'
      | 'vacuum.pedro_the_pooper_scooper_litter_box'
      | 'media_player.master_bedroom'
      | 'script.good_night'
      | 'script.living_room_movie_mode'
      | 'script.living_room_relax_mode'
      | 'script.turn_off_all_tvs'
      | 'script.thermostat_home_sleep'
      | 'script.notification_grocery_list'
      | 'sensor.mystery_device_11_power_2'
      | 'sensor.mystery_device_11_daily_energy_2'
      | 'sensor.mystery_device_11_weekly_energy_2'
      | 'sensor.mystery_device_11_monthly_energy_2'
      | 'sensor.mystery_device_11_yearly_energy_2'
      | 'sensor.mystery_device_11_bill_energy_2'
      | 'sensor.heat_5_usage'
      | 'sensor.kettle_daily_energy'
      | 'sensor.kettle_weekly_energy'
      | 'sensor.kettle_monthly_energy'
      | 'sensor.kettle_yearly_energy'
      | 'sensor.kettle_bill_energy'
      | 'sensor.device_1_usage_2'
      | 'sensor.device_1_daily_energy'
      | 'sensor.device_1_weekly_energy'
      | 'sensor.device_1_monthly_energy'
      | 'sensor.device_1_yearly_energy'
      | 'sensor.device_1_bill_energy'
      | 'sensor.device_5_usage'
      | 'sensor.device_5_daily_energy'
      | 'sensor.device_5_weekly_energy'
      | 'sensor.device_5_monthly_energy'
      | 'sensor.device_5_yearly_energy'
      | 'sensor.device_5_bill_energy'
      | 'sensor.heat_1_usage_2'
      | 'sensor.hvac_fan_daily_energy'
      | 'sensor.hvac_fan_weekly_energy'
      | 'sensor.hvac_fan_monthly_energy'
      | 'sensor.hvac_fan_yearly_energy'
      | 'sensor.hvac_fan_bill_energy'
      | 'sensor.mystery_heat_12_power'
      | 'sensor.mystery_heat_12_daily_energy'
      | 'sensor.mystery_heat_12_weekly_energy'
      | 'sensor.mystery_heat_12_monthly_energy'
      | 'sensor.mystery_heat_12_yearly_energy'
      | 'sensor.mystery_heat_12_bill_energy'
      | 'sensor.oven_power'
      | 'sensor.oven_daily_energy_2'
      | 'sensor.oven_weekly_energy_2'
      | 'sensor.oven_monthly_energy_2'
      | 'sensor.oven_yearly_energy_2'
      | 'sensor.oven_bill_energy_2'
      | 'sensor.mitchell_s_tesla_usage'
      | 'sensor.tesla_daily_energy'
      | 'sensor.tesla_weekly_energy'
      | 'sensor.tesla_monthly_energy'
      | 'sensor.tesla_yearly_energy'
      | 'sensor.tesla_bill_energy'
      | 'sensor.pump_3_usage'
      | 'sensor.pump_3_daily_energy'
      | 'sensor.pump_3_weekly_energy'
      | 'sensor.pump_3_monthly_energy'
      | 'sensor.pump_3_yearly_energy'
      | 'sensor.pump_3_bill_energy'
      | 'sensor.device_3_usage_2'
      | 'sensor.device_3_daily_energy'
      | 'sensor.device_3_weekly_energy'
      | 'sensor.device_3_monthly_energy'
      | 'sensor.device_3_yearly_energy'
      | 'sensor.device_3_bill_energy'
      | 'sensor.fridge_2_power'
      | 'sensor.fridge_2_daily_energy'
      | 'sensor.fridge_2_weekly_energy'
      | 'sensor.fridge_2_monthly_energy'
      | 'sensor.fridge_2_yearly_energy'
      | 'sensor.fridge_2_bill_energy'
      | 'sensor.mystery_device_11_power'
      | 'sensor.mystery_device_11_daily_energy'
      | 'sensor.mystery_device_11_weekly_energy'
      | 'sensor.mystery_device_11_monthly_energy'
      | 'sensor.mystery_device_11_yearly_energy'
      | 'sensor.mystery_device_11_bill_energy'
      | 'sensor.dryer_power'
      | 'sensor.dryer_daily_energy_2'
      | 'sensor.dryer_weekly_energy_2'
      | 'sensor.dryer_monthly_energy_2'
      | 'sensor.dryer_yearly_energy_2'
      | 'sensor.dryer_bill_energy_2'
      | 'sensor.ac_power'
      | 'sensor.ac_daily_energy_2'
      | 'sensor.ac_weekly_energy_2'
      | 'sensor.ac_monthly_energy_2'
      | 'sensor.ac_yearly_energy_2'
      | 'sensor.ac_bill_energy_2'
      | 'sensor.dishwasher_usage_2'
      | 'sensor.dishwasher_daily_energy'
      | 'sensor.dishwasher_weekly_energy'
      | 'sensor.dishwasher_monthly_energy'
      | 'sensor.dishwasher_yearly_energy'
      | 'sensor.dishwasher_bill_energy'
      | 'sensor.pump_usage_2'
      | 'sensor.pump_daily_energy'
      | 'sensor.pump_weekly_energy'
      | 'sensor.pump_monthly_energy'
      | 'sensor.pump_yearly_energy'
      | 'sensor.pump_bill_energy'
      | 'sensor.sense_energy_monitor_power'
      | 'sensor.sense_energy_monitor_daily_energy'
      | 'sensor.sense_energy_monitor_weekly_energy'
      | 'sensor.sense_energy_monitor_monthly_energy'
      | 'sensor.sense_energy_monitor_yearly_energy'
      | 'sensor.sense_energy_monitor_bill_energy'
      | 'sensor.always_on_usage'
      | 'sensor.always_on_daily_energy'
      | 'sensor.always_on_weekly_energy'
      | 'sensor.always_on_monthly_energy'
      | 'sensor.always_on_yearly_energy'
      | 'sensor.always_on_bill_energy'
      | 'sensor.mystery_motor_13_power'
      | 'sensor.mystery_motor_13_daily_energy'
      | 'sensor.mystery_motor_13_weekly_energy'
      | 'sensor.mystery_motor_13_monthly_energy'
      | 'sensor.mystery_motor_13_yearly_energy'
      | 'sensor.mystery_motor_13_bill_energy'
      | 'sensor.motor_2_usage_3'
      | 'sensor.motor_2_daily_energy'
      | 'sensor.motor_2_weekly_energy'
      | 'sensor.motor_2_monthly_energy'
      | 'sensor.motor_2_yearly_energy'
      | 'sensor.motor_2_bill_energy'
      | 'sensor.mystery_device_10_usage'
      | 'sensor.mystery_device_10_daily_energy'
      | 'sensor.mystery_device_10_weekly_energy'
      | 'sensor.mystery_device_10_monthly_energy'
      | 'sensor.mystery_device_10_yearly_energy'
      | 'sensor.mystery_device_10_bill_energy'
      | 'sensor.electric_vehicle_power'
      | 'sensor.electric_vehicle_daily_energy'
      | 'sensor.electric_vehicle_weekly_energy'
      | 'sensor.electric_vehicle_monthly_energy'
      | 'sensor.electric_vehicle_yearly_energy'
      | 'sensor.electric_vehicle_bill_energy'
      | 'sensor.motor_3_usage_3'
      | 'sensor.motor_3_daily_energy'
      | 'sensor.motor_3_weekly_energy'
      | 'sensor.motor_3_monthly_energy'
      | 'sensor.motor_3_yearly_energy'
      | 'sensor.motor_3_bill_energy'
      | 'sensor.ac_2_usage_2'
      | 'sensor.ac_2_daily_energy'
      | 'sensor.ac_2_weekly_energy'
      | 'sensor.ac_2_monthly_energy'
      | 'sensor.ac_2_yearly_energy'
      | 'sensor.ac_2_bill_energy'
      | 'sensor.fridge_usage_2'
      | 'sensor.fridge_daily_energy'
      | 'sensor.fridge_weekly_energy'
      | 'sensor.fridge_monthly_energy'
      | 'sensor.fridge_yearly_energy'
      | 'sensor.fridge_bill_energy'
      | 'sensor.heat_3_usage_2'
      | 'sensor.heat_3_daily_energy'
      | 'sensor.heat_3_weekly_energy'
      | 'sensor.heat_3_monthly_energy'
      | 'sensor.heat_3_yearly_energy'
      | 'sensor.heat_3_bill_energy'
      | 'sensor.microwave_usage_3'
      | 'sensor.microwave_daily_energy'
      | 'sensor.microwave_weekly_energy'
      | 'sensor.microwave_monthly_energy'
      | 'sensor.microwave_yearly_energy'
      | 'sensor.microwave_bill_energy'
      | 'sensor.other_usage'
      | 'sensor.other_daily_energy'
      | 'sensor.other_weekly_energy'
      | 'sensor.other_monthly_energy'
      | 'sensor.other_yearly_energy'
      | 'sensor.other_bill_energy'
      | 'sensor.energy_production'
      | 'sensor.energy_usage'
      | 'sensor.l1_voltage'
      | 'sensor.l2_voltage'
      | 'sensor.daily_production'
      | 'sensor.daily_usage'
      | 'sensor.daily_net_production'
      | 'sensor.daily_from_grid'
      | 'sensor.daily_to_grid'
      | 'sensor.weekly_production'
      | 'sensor.weekly_usage'
      | 'sensor.weekly_net_production'
      | 'sensor.weekly_from_grid'
      | 'sensor.weekly_to_grid'
      | 'sensor.monthly_production'
      | 'sensor.monthly_usage'
      | 'sensor.monthly_net_production'
      | 'sensor.monthly_from_grid'
      | 'sensor.monthly_to_grid'
      | 'sensor.yearly_production'
      | 'sensor.yearly_usage'
      | 'sensor.yearly_net_production'
      | 'sensor.yearly_from_grid'
      | 'sensor.yearly_to_grid'
      | 'sensor.sense_bill_production'
      | 'sensor.sense_bill_energy'
      | 'sensor.sense_bill_net_production'
      | 'sensor.sense_bill_from_grid'
      | 'sensor.sense_bill_to_grid'
      | 'media_player.master_bed_bath'
      | 'media_player.ryan_s_room'
      | 'update.bluetooth_proxy_2nd_floor_firmware'
      | 'media_player.third_floor'
      | 'media_player.second_floor_bathroom_google_mini'
      | 'media_player.kitchen_display'
      | 'update.lr4_beta_firmware'
      | 'calendar.school'
      | 'calendar.holidays_in_united_states'
      | 'calendar.family_calendar'
      | 'calendar.mitchslevin_gmail_com'
      | 'calendar.birthdays'
      | 'media_player.announcements'
      | 'media_player.entry_way'
      | 'media_player.family_room_tv'
      | 'update.pedro_the_pooper_scooper_firmware'
      | 'media_player.kitchen_speaker'
      | 'media_player.second_floor'
      | 'media_player.all'
      | 'binary_sensor.octoprint_connected'
      | 'binary_sensor.octoprint_printing'
      | 'button.octoprint_emergency_stop'
      | 'button.octoprint_cancel_print'
      | 'button.octoprint_shutdown_system'
      | 'button.octoprint_reboot_system'
      | 'button.octoprint_restart_server'
      | 'sensor.octoprint_last_event'
      | 'sensor.octoprint_print_status'
      | 'sensor.octoprint_print_progress'
      | 'sensor.octoprint_print_file'
      | 'sensor.octoprint_print_time'
      | 'sensor.octoprint_print_time_left'
      | 'sensor.octoprint_approximate_total_print_time'
      | 'sensor.octoprint_approximate_completion_time'
      | 'sensor.octoprint_current_z'
      | 'sensor.octoprint_slicing_progress'
      | 'sensor.octoprint_slicing_file'
      | 'sensor.octoprint_tool_0_temperature'
      | 'sensor.octoprint_tool_0_target'
      | 'sensor.octoprint_bed_temperature'
      | 'sensor.octoprint_bed_target'
      | 'sensor.octoprint_soc_temperature'
      | 'switch.octoprint_connect_to_printer'
      | 'switch.octoprint_pause_print'
      | 'switch.octoprint_camera_snapshot'
      | 'assist_satellite.esp32_s3_box_3_d84e10_assist_satellite'
      | 'sensor.chinese_air_pollution_level'
      | 'sensor.chinese_air_quality_index'
      | 'sensor.chinese_main_pollutant'
      | 'sensor.u_s_air_pollution_level'
      | 'sensor.u_s_air_quality_index'
      | 'sensor.u_s_main_pollutant'
      | 'media_player.spotify_mitchell_lane_hayes'
      | 'sensor.humidor_temperature'
      | 'sensor.humidor_humidity'
      | 'sensor.humidor_battery'
      | 'sensor.h5074_a5ea_temperature'
      | 'sensor.h5074_a5ea_humidity'
      | 'sensor.h5074_a5ea_battery'
      | 'button.game_room_identify'
      | 'button.ryan_s_room_identify'
      | 'button.master_bedroom_identify'
      | 'button.gym_identify'
      | 'binary_sensor.game_room_occupancy_2'
      | 'binary_sensor.game_room_motion'
      | 'binary_sensor.ryan_s_room_occupancy_2'
      | 'binary_sensor.ryan_s_room_motion'
      | 'binary_sensor.master_bedroom_occupancy_2'
      | 'binary_sensor.master_bedroom_motion'
      | 'binary_sensor.gym_occupancy'
      | 'binary_sensor.gym_motion'
      | 'sensor.game_room_battery'
      | 'sensor.game_room_temperature_2'
      | 'sensor.ryan_s_room_battery'
      | 'sensor.ryan_s_room_temperature_2'
      | 'sensor.master_bedroom_battery'
      | 'sensor.master_bedroom_temperature_2'
      | 'sensor.gym_battery'
      | 'sensor.gym_temperature'
      | 'light.stick_light_1'
      | 'light.game_room_stick_light_2'
      | 'binary_sensor.echo_show_kiosk_mode'
      | 'binary_sensor.echo_show_plugged_in'
      | 'binary_sensor.echo_show_device_admin'
      | 'button.echo_show_restart_browser'
      | 'button.echo_show_reboot_device'
      | 'button.echo_show_bring_to_foreground'
      | 'button.echo_show_send_to_background'
      | 'button.echo_show_load_start_url'
      | 'button.echo_show_clear_browser_cache'
      | 'button.echo_show_trigger_motion_activity'
      | 'camera.echo_show'
      | 'image.echo_show_screenshot'
      | 'media_player.echo_show'
      | 'notify.echo_show_overlay_message'
      | 'notify.echo_show_text_to_speech'
      | 'number.echo_show_screensaver_timer'
      | 'number.echo_show_screensaver_brightness'
      | 'number.echo_show_screen_off_timer'
      | 'number.echo_show_screen_brightness'
      | 'sensor.echo_show_battery'
      | 'sensor.echo_show_battery_temperature'
      | 'sensor.echo_show_current_page'
      | 'sensor.echo_show_screen_orientation'
      | 'sensor.echo_show_foreground_app'
      | 'sensor.echo_show_internal_storage_free_space'
      | 'sensor.echo_show_internal_storage_total_space'
      | 'sensor.echo_show_free_memory'
      | 'sensor.echo_show_total_memory'
      | 'switch.echo_show_screensaver'
      | 'switch.echo_show_maintenance_mode'
      | 'switch.echo_show_kiosk_lock'
      | 'switch.echo_show_motion_detection'
      | 'switch.echo_show_screen'
      | 'alarm_control_panel.alarm_control_panel'
      | 'camera.kitchen_display'
      | 'camera.foor_door_doorbell'
      | 'event.foor_door_doorbell_chime'
      | 'binary_sensor.takumi_collar_battery_charging'
      | 'binary_sensor.fb34m298176_connection_health'
      | 'binary_sensor.takumi_firmware_update_available'
      | 'binary_sensor.wifi_tylrhome_hidden'
      | 'binary_sensor.wifi_pouroverip_hidden'
      | 'device_tracker.fb34m298176_tracker'
      | 'device_tracker.wifi_tylrhome'
      | 'device_tracker.wifi_pouroverip'
      | 'light.takumi_collar_light'
      | 'number.takumi_weight_setting'
      | 'select.takumi_lost_mode'
      | 'sensor.takumi_collar_battery_level'
      | 'sensor.takumi_daily_steps'
      | 'sensor.takumi_weekly_steps'
      | 'sensor.takumi_monthly_steps'
      | 'sensor.takumi_daily_distance'
      | 'sensor.takumi_weekly_distance'
      | 'sensor.takumi_monthly_distance'
      | 'sensor.takumi_daily_sleep'
      | 'sensor.takumi_weekly_sleep'
      | 'sensor.takumi_monthly_sleep'
      | 'sensor.takumi_daily_nap'
      | 'sensor.takumi_weekly_nap'
      | 'sensor.takumi_monthly_nap'
      | 'sensor.takumi_daily_goal'
      | 'sensor.takumi_weekly_goal'
      | 'sensor.takumi_monthly_goal'
      | 'sensor.takumi_activity_type'
      | 'sensor.takumi_current_place_name'
      | 'sensor.takumi_current_place_address'
      | 'sensor.takumi_connected_to'
      | 'sensor.takumi_home_city_state'
      | 'sensor.takumi_gender'
      | 'sensor.takumi_weight'
      | 'sensor.takumi_age'
      | 'sensor.takumi_connection_state'
      | 'sensor.takumi_led_color'
      | 'sensor.takumi_module_id'
      | 'sensor.takumi_signal_strength'
      | 'sensor.takumi_sleep_quality_score'
      | 'sensor.takumi_daily_barking_count'
      | 'sensor.takumi_daily_barking_duration'
      | 'sensor.takumi_daily_licking_count'
      | 'sensor.takumi_daily_licking_duration'
      | 'sensor.takumi_daily_scratching_count'
      | 'sensor.takumi_daily_scratching_duration'
      | 'sensor.takumi_daily_eating_count'
      | 'sensor.takumi_daily_eating_duration'
      | 'sensor.takumi_daily_drinking_count'
      | 'sensor.takumi_daily_drinking_duration'
      | 'sensor.takumi_weekly_barking_count'
      | 'sensor.takumi_weekly_barking_duration'
      | 'sensor.takumi_weekly_licking_count'
      | 'sensor.takumi_weekly_licking_duration'
      | 'sensor.takumi_weekly_scratching_count'
      | 'sensor.takumi_weekly_scratching_duration'
      | 'sensor.takumi_weekly_eating_count'
      | 'sensor.takumi_weekly_eating_duration'
      | 'sensor.takumi_weekly_drinking_count'
      | 'sensor.takumi_weekly_drinking_duration'
      | 'sensor.takumi_monthly_barking_count'
      | 'sensor.takumi_monthly_barking_duration'
      | 'sensor.takumi_monthly_licking_count'
      | 'sensor.takumi_monthly_licking_duration'
      | 'sensor.takumi_monthly_scratching_count'
      | 'sensor.takumi_monthly_scratching_duration'
      | 'sensor.takumi_monthly_eating_count'
      | 'sensor.takumi_monthly_eating_duration'
      | 'sensor.takumi_monthly_drinking_count'
      | 'sensor.takumi_monthly_drinking_duration'
      | 'sensor.fb34m298176'
      | 'sensor.fb34m298176_wifi_ssid'
      | 'sensor.fb34m298176_base_id'
      | 'sensor.fb34m298176_connection_quality'
      | 'sensor.wifi_tylrhome_status'
      | 'sensor.wifi_tylrhome_address'
      | 'sensor.wifi_pouroverip_status'
      | 'sensor.wifi_pouroverip_address'
      | 'switch.takumi_lost_mode_switch'
      | 'automation.window_turn_off_thermostat'
      | 'automation.evening_blinds'
      | 'automation.battery_check'
      | 'automation.sun_blinds_pm'
      | 'automation.away_mode'
      | 'automation.home_mode'
      | 'automation.reset_helpers'
      | 'automation.charge_check_mitchell_tesla'
      | 'automation.stairs_light_auto_off'
      | 'automation.entry_way_light_auto_off'
      | 'automation.washer_timer'
      | 'automation.laundry_timer_complete'
      | 'automation.dryer_timer'
      | 'automation.nfc_michelle_s_office_lights'
      | 'automation.turn_off_upstairs_hallway_light'
      | 'automation.reset_helpers_at_0200'
      | 'automation.nfc_gym_vac_switch_2'
      | 'automation.shortcut_company_kill_switch_guests'
      | 'automation.music_second_floor_bathroom'
      | 'automation.vacuum_second_floor'
      | 'automation.lights_master_bedroom_0900_1800_sync'
      | 'automation.lights_sync_master_bedroom_lights_off'
      | 'automation.fan_ryan_s_room_temp'
      | 'automation.fan_master_bedroom_temp'
      | 'automation.routine_good_night'
      | 'automation.mode_on_the_way_home'
      | 'automation.house_mode_handler'
      | 'automation.reminder_grocery_list'
      | 'automation.reminder_charge_home_batteries_new'
      | 'automation.echo_show_screen_control'
      | 'binary_sensor.deck_speaker_power'
      | 'sensor.deck_speaker_battery'
      | 'media_player.deck_speaker'
      | 'binary_sensor.deck_speaker_microphone'
      | 'switch.deck_speaker_crossfade'
      | 'switch.deck_speaker_loudness'
      | 'number.deck_speaker_bass'
      | 'number.deck_speaker_balance'
      | 'number.deck_speaker_treble'
      | 'binary_sensor.a1mini_0309ca571901191_recording_timelapse'
      | 'binary_sensor.a1mini_0309ca571901191_extruder_filament_state'
      | 'binary_sensor.a1mini_0309ca571901191_hms_errors'
      | 'binary_sensor.a1mini_0309ca571901191_print_error'
      | 'binary_sensor.a1mini_0309ca571901191_online'
      | 'binary_sensor.a1mini_0309ca571901191_firmware_update'
      | 'binary_sensor.a1mini_0309ca571901191_developer_lan_mode'
      | 'binary_sensor.a1mini_0309ca571901191_mqtt_encryption_firmware'
      | 'binary_sensor.a1mini_0309ca571901191_hybrid_mqtt_blocks_control'
      | 'binary_sensor.a1mini_0309ca571901191_ams_1_active'
      | 'binary_sensor.a1mini_0309ca571901191_externalspool_active'
      | 'button.a1mini_0309ca571901191_pause_printing'
      | 'button.a1mini_0309ca571901191_resume_printing'
      | 'button.a1mini_0309ca571901191_stop_printing'
      | 'button.a1mini_0309ca571901191_force_refresh_data'
      | 'camera.a1mini_0309ca571901191_camera'
      | 'fan.a1mini_0309ca571901191_cooling_fan'
      | 'image.a1mini_0309ca571901191_cover_image'
      | 'image.a1mini_0309ca571901191_pick_image'
      | 'light.a1mini_0309ca571901191_chamber_light'
      | 'number.a1mini_0309ca571901191_nozzle_target_temperature'
      | 'number.a1mini_0309ca571901191_bed_target_temperature'
      | 'select.a1mini_0309ca571901191_printing_speed'
      | 'sensor.a1mini_0309ca571901191_externalspool_external_spool'
      | 'sensor.a1mini_0309ca571901191_ams_1_humidity_index'
      | 'sensor.a1mini_0309ca571901191_ams_1_humidity'
      | 'sensor.a1mini_0309ca571901191_ams_1_temperature'
      | 'sensor.a1mini_0309ca571901191_ams_1_tray_1'
      | 'sensor.a1mini_0309ca571901191_ams_1_tray_2'
      | 'sensor.a1mini_0309ca571901191_ams_1_tray_3'
      | 'sensor.a1mini_0309ca571901191_ams_1_tray_4'
      | 'sensor.a1mini_0309ca571901191_mqtt_connection_mode'
      | 'sensor.a1mini_0309ca571901191_wi_fi_signal'
      | 'sensor.a1mini_0309ca571901191_bed_temperature'
      | 'sensor.a1mini_0309ca571901191_bed_target_temperature'
      | 'sensor.a1mini_0309ca571901191_nozzle_temperature'
      | 'sensor.a1mini_0309ca571901191_nozzle_target_temperature'
      | 'sensor.a1mini_0309ca571901191_cooling_fan_speed'
      | 'sensor.a1mini_0309ca571901191_heatbreak_fan_speed'
      | 'sensor.a1mini_0309ca571901191_model_download'
      | 'sensor.a1mini_0309ca571901191_speed_profile'
      | 'sensor.a1mini_0309ca571901191_current_stage'
      | 'sensor.a1mini_0309ca571901191_print_progress'
      | 'sensor.a1mini_0309ca571901191_print_status'
      | 'sensor.a1mini_0309ca571901191_printable_objects'
      | 'sensor.a1mini_0309ca571901191_sd_card_status'
      | 'sensor.a1mini_0309ca571901191_skipped_objects'
      | 'sensor.a1mini_0309ca571901191_start_time'
      | 'sensor.a1mini_0309ca571901191_remaining_time'
      | 'sensor.a1mini_0309ca571901191_end_time'
      | 'sensor.a1mini_0309ca571901191_total_usage'
      | 'sensor.a1mini_0309ca571901191_current_layer'
      | 'sensor.a1mini_0309ca571901191_total_layer_count'
      | 'sensor.a1mini_0309ca571901191_gcode_filename'
      | 'sensor.a1mini_0309ca571901191_gcode_file_downloaded'
      | 'sensor.a1mini_0309ca571901191_task_name'
      | 'sensor.a1mini_0309ca571901191_print_type'
      | 'sensor.a1mini_0309ca571901191_printer_name'
      | 'sensor.a1mini_0309ca571901191_print_length'
      | 'sensor.a1mini_0309ca571901191_print_bed_type'
      | 'sensor.a1mini_0309ca571901191_print_weight'
      | 'sensor.a1mini_0309ca571901191_active_tray'
      | 'sensor.a1mini_0309ca571901191_nozzle_size'
      | 'sensor.a1mini_0309ca571901191_nozzle_type'
      | 'sensor.a1mini_0309ca571901191_ip_address'
      | 'sensor.a1mini_0309ca571901191_serial_number'
      | 'switch.a1mini_0309ca571901191_enable_camera'
      | 'switch.a1mini_0309ca571901191_use_image_sensor_camera'
      | 'switch.a1mini_0309ca571901191_allow_prompt_sound'
      | 'device_tracker.takumi_tracker'
      | 'sensor.freya_charging_rate'
      | 'sensor.freya_energy_added'
      | 'sensor.freya_charger_power'
      | 'sensor.freya_odometer'
      | 'sensor.freya_shift_state'
      | 'sensor.freya_range'
      | 'sensor.freya_temperature_outside'
      | 'sensor.freya_temperature_inside'
      | 'sensor.freya_time_charge_complete'
      | 'sensor.freya_tpms_front_left'
      | 'sensor.freya_tpms_front_right'
      | 'sensor.freya_tpms_rear_left'
      | 'sensor.freya_tpms_rear_right'
      | 'sensor.freya_arrival_time'
      | 'sensor.freya_distance_to_arrival'
      | 'sensor.freya_data_last_update_time'
      | 'sensor.freya_polling_interval'
      | 'sensor.scarlett_charging_rate'
      | 'sensor.scarlett_energy_added'
      | 'sensor.scarlett_charger_power'
      | 'sensor.scarlett_odometer'
      | 'sensor.scarlett_shift_state'
      | 'sensor.scarlett_range'
      | 'sensor.scarlett_temperature_outside'
      | 'sensor.scarlett_temperature_inside'
      | 'sensor.scarlett_time_charge_complete'
      | 'sensor.scarlett_tpms_front_left'
      | 'sensor.scarlett_tpms_front_right'
      | 'sensor.scarlett_tpms_rear_left'
      | 'sensor.scarlett_tpms_rear_right'
      | 'sensor.scarlett_arrival_time'
      | 'sensor.scarlett_distance_to_arrival'
      | 'sensor.scarlett_data_last_update_time'
      | 'sensor.scarlett_polling_interval'
      | 'lock.freya_doors'
      | 'lock.freya_charge_port_latch'
      | 'lock.scarlett_doors'
      | 'lock.scarlett_charge_port_latch'
      | 'climate.freya_hvac_climate_system'
      | 'climate.scarlett_hvac_climate_system'
      | 'cover.freya_charger_door'
      | 'cover.freya_frunk'
      | 'cover.freya_trunk'
      | 'cover.freya_windows'
      | 'cover.scarlett_charger_door'
      | 'cover.scarlett_frunk'
      | 'cover.scarlett_trunk'
      | 'cover.scarlett_windows'
      | 'binary_sensor.freya_parking_brake'
      | 'binary_sensor.freya_online'
      | 'binary_sensor.freya_asleep'
      | 'binary_sensor.freya_charger'
      | 'binary_sensor.freya_charging'
      | 'binary_sensor.freya_doors'
      | 'binary_sensor.freya_windows'
      | 'binary_sensor.freya_scheduled_charging'
      | 'binary_sensor.freya_scheduled_departure'
      | 'binary_sensor.freya_user_present'
      | 'binary_sensor.scarlett_parking_brake'
      | 'binary_sensor.scarlett_online'
      | 'binary_sensor.scarlett_asleep'
      | 'binary_sensor.scarlett_charger'
      | 'binary_sensor.scarlett_charging'
      | 'binary_sensor.scarlett_doors'
      | 'binary_sensor.scarlett_windows'
      | 'binary_sensor.scarlett_scheduled_charging'
      | 'binary_sensor.scarlett_scheduled_departure'
      | 'binary_sensor.scarlett_user_present'
      | 'device_tracker.freya_location_tracker'
      | 'device_tracker.freya_destination_location_tracker'
      | 'device_tracker.scarlett_location_tracker'
      | 'device_tracker.scarlett_destination_location_tracker'
      | 'switch.freya_heated_steering'
      | 'switch.freya_sentry_mode'
      | 'switch.freya_polling'
      | 'switch.freya_charger'
      | 'switch.freya_valet_mode'
      | 'switch.scarlett_polling'
      | 'switch.scarlett_charger'
      | 'switch.scarlett_valet_mode'
      | 'button.freya_horn'
      | 'button.freya_flash_lights'
      | 'button.freya_wake_up'
      | 'button.freya_force_data_update'
      | 'button.freya_remote_start'
      | 'button.scarlett_horn'
      | 'button.scarlett_flash_lights'
      | 'button.scarlett_wake_up'
      | 'button.scarlett_force_data_update'
      | 'button.scarlett_remote_start'
      | 'select.freya_cabin_overheat_protection'
      | 'select.freya_heated_steering_wheel'
      | 'select.freya_heated_seat_left'
      | 'select.freya_heated_seat_right'
      | 'select.freya_heated_seat_rear_left'
      | 'select.freya_heated_seat_rear_center'
      | 'select.freya_heated_seat_rear_right'
      | 'select.scarlett_cabin_overheat_protection'
      | 'select.scarlett_heated_seat_left'
      | 'select.scarlett_heated_seat_right'
      | 'select.scarlett_heated_seat_rear_left'
      | 'select.scarlett_heated_seat_rear_center'
      | 'select.scarlett_heated_seat_rear_right'
      | 'update.freya_software_update'
      | 'update.scarlett_software_update'
      | 'number.freya_charge_limit'
      | 'number.freya_charging_amps'
      | 'number.scarlett_charge_limit'
      | 'number.scarlett_charging_amps'
      | 'sensor.freya_battery'
      | 'sensor.scarlett_battery'
      | 'binary_sensor.updater'
      | 'media_player.office'
      | 'binary_sensor.heat'
      | 'binary_sensor.dishwasher'
      | 'binary_sensor.dryer'
      | 'sensor.heat_usage'
      | 'sensor.dishwasher_usage'
      | 'sensor.dryer_usage'
      | 'binary_sensor.garage_door'
      | 'sensor.garage_door_usage'
      | 'binary_sensor.device_1'
      | 'binary_sensor.device_2'
      | 'binary_sensor.fridge'
      | 'binary_sensor.microwave'
      | 'binary_sensor.light_2'
      | 'sensor.device_1_usage'
      | 'sensor.device_2_usage'
      | 'sensor.fridge_usage'
      | 'sensor.microwave_usage'
      | 'sensor.light_2_usage'
      | 'binary_sensor.device_3'
      | 'binary_sensor.motor_1'
      | 'sensor.device_3_usage'
      | 'sensor.motor_1_usage'
      | 'binary_sensor.ac'
      | 'sensor.ac_usage'
      | 'binary_sensor.motor_2'
      | 'sensor.motor_2_usage'
      | 'binary_sensor.heat_4'
      | 'sensor.heat_4_usage'
      | 'sensor.daily_usage_cost'
      | 'sensor.disk_use_home'
      | 'sensor.disk_free_home'
      | 'sensor.disk_use_percent_home'
      | 'sensor.memory_free'
      | 'sensor.memory_use'
      | 'sensor.memory_use_percent'
      | 'sensor.network_in_eth0'
      | 'sensor.network_out_eth0'
      | 'sensor.network_throughput_in_eth0'
      | 'sensor.network_throughput_out_eth0'
      | 'sensor.ipv4_address_eth0'
      | 'sensor.packets_in_eth0'
      | 'sensor.packets_out_eth0'
      | 'sensor.processor_use'
      | 'script.hki_header_greeting_default'
      | 'script.hki_dark_default'
      | 'script.hki_dark_empty'
      | 'script.hki_light_default'
      | 'script.hki_light_empty'
      | 'binary_sensor.ac_2'
      | 'sensor.ac_2_usage'
      | 'binary_sensor.microwave_2'
      | 'binary_sensor.motor_3'
      | 'binary_sensor.pump'
      | 'sensor.microwave_usage_2'
      | 'sensor.motor_3_usage'
      | 'sensor.pump_usage'
      | 'binary_sensor.utility_room_leak'
      | 'binary_sensor.utility_room_leak_battery'
      | 'binary_sensor.microwave_2_2'
      | 'sensor.microwave_2_usage'
      | 'binary_sensor.microwave_2_3'
      | 'binary_sensor.device_4'
      | 'sensor.microwave_2_usage_2'
      | 'sensor.device_4_usage'
      | 'binary_sensor.heat_1'
      | 'binary_sensor.heat_7'
      | 'sensor.heat_1_usage'
      | 'sensor.heat_7_usage'
      | 'binary_sensor.heat_6'
      | 'sensor.heat_6_usage'
      | 'binary_sensor.device_2_2'
      | 'sensor.device_2_usage_2'
      | 'binary_sensor.furnace'
      | 'binary_sensor.motor_2_2'
      | 'binary_sensor.microwave_2_4'
      | 'binary_sensor.motor_1_2'
      | 'binary_sensor.motor_3_2'
      | 'sensor.furnace_usage'
      | 'sensor.motor_2_usage_2'
      | 'sensor.microwave_2_usage_3'
      | 'sensor.motor_1_usage_2'
      | 'sensor.motor_3_usage_2'
      | 'update.air_quality_1_firmware'
      | 'binary_sensor.heat_3'
      | 'sensor.heat_3_usage'
      | 'calendar.inbox'
      | 'calendar.personal'
      | 'calendar.honey_do'
      | 'calendar.home_assistant'
      | 'calendar.schedule'
      | 'binary_sensor.ac_3'
      | 'sensor.ac_usage_2'
      | 'binary_sensor.motor_1_3'
      | 'sensor.motor_1_usage_3'
      | 'calendar.weather'
      | 'binary_sensor.motor_4'
      | 'sensor.motor_4_usage'
      | 'binary_sensor.device_4_2'
      | 'sensor.device_4_usage_2'
      | 'binary_sensor.furnace_2'
      | 'binary_sensor.heat_6_2'
      | 'sensor.furnace_usage_2'
      | 'sensor.heat_6_usage_2'
      | 'sensor.southeast_harford'
      | 'media_player.as_chromecast_cast_2'
      | 'binary_sensor.furnace_2_2'
      | 'sensor.furnace_2_usage'
      | 'binary_sensor.furnace_3'
      | 'sensor.furnace_usage_3'
      | 'binary_sensor.ac_4'
      | 'binary_sensor.heat_7_2'
      | 'sensor.ac_usage_3'
      | 'sensor.heat_7_usage_2'
      | 'media_player.as_chromecast_cast_3'
      | 'binary_sensor.oven'
      | 'sensor.oven_usage'
      | 'binary_sensor.ac_5'
      | 'sensor.ac_usage_4'
      | 'binary_sensor.oven_2'
      | 'sensor.oven_usage_2'
      | 'vacuum.first_floor_vacuum'
      | 'sensor.first_floor_vacuum_area_cleaned'
      | 'sensor.first_floor_vacuum_battery'
      | 'sensor.first_floor_vacuum_cleaning_duration'
      | 'sensor.first_floor_vacuum_filter_lifespan'
      | 'sensor.first_floor_vacuum_main_brush_lifespan'
      | 'image.first_floor_vacuum_map'
      | 'binary_sensor.first_floor_vacuum_mop_attached'
      | 'button.first_floor_vacuum_relocate'
      | 'sensor.first_floor_vacuum_side_brushes_lifespan'
      | 'sensor.first_floor_vacuum_total_area_cleaned'
      | 'sensor.first_floor_vacuum_total_cleaning_duration'
      | 'sensor.first_floor_vacuum_total_cleanings'
      | 'select.first_floor_vacuum_water_flow_level'
      | 'event.first_floor_vacuum_last_job'
      | 'binary_sensor.motor_1_4'
      | 'sensor.motor_1_usage_4'
      | 'sensor.first_floor_vacuum_unit_care_lifespan'
      | 'binary_sensor.ac_6'
      | 'sensor.ac_usage_5'
      | 'switch.music_assistant_pre_release'
      | 'update.music_assistant_update'
      | 'binary_sensor.dryer_2'
      | 'sensor.dryer_usage_2'
      | 'sensor.dryer_daily_energy'
      | 'sensor.dryer_weekly_energy'
      | 'sensor.dryer_monthly_energy'
      | 'sensor.dryer_yearly_energy'
      | 'sensor.dryer_bill_energy'
      | 'sensor.ac_daily_energy'
      | 'sensor.ac_weekly_energy'
      | 'sensor.ac_monthly_energy'
      | 'sensor.ac_yearly_energy'
      | 'sensor.ac_bill_energy'
      | 'sensor.oven_daily_energy'
      | 'sensor.oven_weekly_energy'
      | 'sensor.oven_monthly_energy'
      | 'sensor.oven_yearly_energy'
      | 'sensor.oven_bill_energy'
      | 'sensor.motor_1_daily_energy'
      | 'sensor.motor_1_weekly_energy'
      | 'sensor.motor_1_monthly_energy'
      | 'sensor.motor_1_yearly_energy'
      | 'sensor.motor_1_bill_energy'
      | 'sensor.spotify_mitchell_lane_hayes_song_tempo'
      | 'select.ryan_night_light_level'
      | 'binary_sensor.mystery_motor_12_power'
      | 'sensor.mystery_motor_12_power'
      | 'sensor.mystery_motor_12_daily_energy'
      | 'sensor.mystery_motor_12_weekly_energy'
      | 'sensor.mystery_motor_12_monthly_energy'
      | 'sensor.mystery_motor_12_yearly_energy'
      | 'sensor.mystery_motor_12_bill_energy'
      | 'switch.back_yard_sprinkler_smart_watering_program'
      | 'switch.back_yard_sprinkler_zone'
      | 'select.gym_air_purifier_night_light_level'
      | 'select.second_floor_air_purifier_night_light_level'
      | 'sensor.ryans_air_purifier_air_quality'
      | 'calendar.webcal_thirdeyecomics_com_post_type_tribe_events_ical_1_eventdisplay_list'
      | 'button.craft_room_display_favorite_current_song'
      | 'media_player.craft_room_display'
      | 'button.entryway_speaker_favorite_current_song'
      | 'media_player.entryway_speaker'
      | 'button.kitchen_display_favorite_current_song'
      | 'media_player.kitchen_display_2'
      | 'button.announcements_favorite_current_song'
      | 'media_player.announcements_2'
      | 'button.third_floor_favorite_current_song'
      | 'media_player.third_floor_2'
      | 'button.2nd_floor_bathroom_favorite_current_song'
      | 'media_player.2nd_floor_bathroom'
      | 'button.family_room_favorite_current_song'
      | 'media_player.family_room_2'
      | 'button.first_floor_favorite_current_song'
      | 'media_player.first_floor_2'
      | 'button.ryan_s_room_speaker_favorite_current_song'
      | 'media_player.ryan_s_room_speaker'
      | 'button.master_bedroom_speaker_favorite_current_song'
      | 'media_player.master_bedroom_speaker'
      | 'button.master_bed_bath_favorite_current_song'
      | 'media_player.master_bed_bath_2'
      | 'button.all_favorite_current_song'
      | 'media_player.all_2'
      | 'button.kitchen_speaker_favorite_current_song'
      | 'media_player.kitchen_speaker_2'
      | 'button.second_floor_favorite_current_song'
      | 'media_player.second_floor_2'
      | 'sensor.back_yard_review_status'
      | 'sensor.front_door_review_status'
      | 'sensor.front_door_all_count'
      | 'sensor.front_door_person_count'
      | 'sensor.back_yard_cat_count'
      | 'sensor.front_door_dog_count'
      | 'sensor.back_yard_all_count'
      | 'sensor.back_yard_person_count'
      | 'sensor.back_yard_dog_count'
      | 'sensor.front_door_cat_count'
      | 'sensor.front_door_all_active_count'
      | 'sensor.front_door_person_active_count'
      | 'sensor.back_yard_cat_active_count'
      | 'sensor.front_door_dog_active_count'
      | 'sensor.back_yard_all_active_count'
      | 'sensor.back_yard_person_active_count'
      | 'sensor.back_yard_dog_active_count'
      | 'sensor.front_door_cat_active_count'
      | 'camera.front_door'
      | 'camera.back_yard'
      | 'image.front_door_person'
      | 'image.back_yard_cat'
      | 'image.front_door_dog'
      | 'image.back_yard_person'
      | 'image.back_yard_dog'
      | 'image.front_door_cat'
      | 'switch.front_door_detect'
      | 'switch.front_door_motion'
      | 'switch.front_door_recordings'
      | 'switch.front_door_snapshots'
      | 'switch.front_door_review_alerts'
      | 'switch.front_door_review_detections'
      | 'switch.back_yard_detect'
      | 'switch.back_yard_motion'
      | 'switch.back_yard_recordings'
      | 'switch.back_yard_snapshots'
      | 'switch.back_yard_review_alerts'
      | 'switch.back_yard_review_detections'
      | 'binary_sensor.front_door_all_occupancy'
      | 'binary_sensor.front_door_person_occupancy'
      | 'binary_sensor.back_yard_cat_occupancy'
      | 'binary_sensor.front_door_dog_occupancy'
      | 'binary_sensor.back_yard_all_occupancy'
      | 'binary_sensor.back_yard_person_occupancy'
      | 'binary_sensor.back_yard_dog_occupancy'
      | 'binary_sensor.front_door_cat_occupancy'
      | 'binary_sensor.back_yard_motion_2'
      | 'binary_sensor.front_door_motion'
      | 'update.frigate_server'
      | 'button.prusa_core_one_cancel_job'
      | 'button.prusa_core_one_pause_job'
      | 'button.prusa_core_one_resume_job'
      | 'camera.prusa_core_one_preview'
      | 'sensor.prusa_core_one'
      | 'sensor.prusa_core_one_print_speed'
      | 'sensor.prusa_core_one_material'
      | 'sensor.prusa_core_one_progress'
      | 'sensor.prusa_core_one_filename'
      | 'sensor.prusa_core_one_print_start'
      | 'sensor.prusa_core_one_print_finish'
      | 'button.deck_favorite_current_song'
      | 'media_player.deck'
      | 'button.living_room_favorite_current_song'
      | 'media_player.living_room_2'
      | 'button.gym_tv_favorite_current_song'
      | 'media_player.gym_tv_2'
      | 'button.thermostat_favorite_current_song'
      | 'media_player.thermostat'
      | 'button.macbook_pro_airplay_favorite_current_song'
      | 'media_player.macbook_pro_airplay'
      | 'button.michelles_macbook_air_2_airplay_favorite_current_song'
      | 'media_player.michelles_macbook_air_2_airplay'
      | 'button.lg_webos_sr73u_favorite_current_song'
      | 'media_player.lg_webos_sr73u'
      | 'update.home_assistant_mcp_server_update'
      | 'automation.blinds_am_sun_based'
      | 'zone.walmart'
      | 'automation.lights_game_room_tv_sync'
      | 'automation.lights_game_room_sync_with_main'
      | 'timer.kitchen_timer';
  }
}
