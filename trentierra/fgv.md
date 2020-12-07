---
---

[← Back to companies](index.html#companies)

FGV
===

[Ferrocarrils de la Generalitat Valenciana](https://www.fgv.es/), or FGV for short, is the local train operator for the provinces of Valencia (under the name of [Metrovalencia](https://www.metrovalencia.es/) and Alicante (under the name of [TRAM](https://www.tramalicante.es/)).

They use tren-tierra for suburban trains and metro. Trams, on the other hand, use standard GSM.

Channels
--------

FGV has two channels:
 - Lines 3, 5 and 9 use channel 93.
 - Lines 1 and 2 use channel 94.
 - Line 7 changes the channel while stopped at the Bailén station.

{% for channel in site.data.trentierra.fgv.channels %}
### Channel {{ channel.number }}

  - Mode: {{ channel.mode | upcase }}
{% if channel.mode == 'a' -%}
  - Frequencies:

	<table class="freqtbl">
		<tr>
			<th>Sub<wbr>channel</th>
			<th>Frequency</th>
		</tr>
		{% for freq in channel.subchannels %}
			<tr{% if freq[1].shared.size > 0 %} class="shared"{% endif %}>
				<td>{{ freq[0] | upcase }}</td>
				<td>{{ freq[1].frequency | precision: 3 }} MHz</td>
			</tr>
		{% endfor %}
	</table>
{% elsif channel.mode == 'c' -%}
  - Frequency: {{ channel.subchannels.s.frequency | precision: 3 }} MHz
{% endif %}

{% endfor %}
