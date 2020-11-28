---
extra_css: trentierra.css
---

[← Back to companies](index.html#companies)

Adif
====

[Adif](http://www.adif.es/) is the state-owned company managing most of the train network through Spain.

Adif uses train-tierra through most of Iberian and mixed gauge network, with trains run mainly (but not exclusively) by [Renfe](https://renfe.com/).  Standard gauge lines use GSM-R generally.

Channels
--------

This list has been compiled by collating several information sources [^cnaf] [^afergodella].

Aside from a number, Adif also assigns a color to each channel in mode A, which is used to paint the roof of the repeater stations of each channel [^adifcolor].

{% for channel in site.data.trentierra.adif.channels %}
### Channel {{ channel.number }}

  - Mode: {{ channel.mode | upcase }}
{% if channel.color -%}
  - Color: <span class="ralcolor" style="background-color: #{{ channel.color.hex }}; color: {{ channel.color.hex | textcolor }};">{{ channel.color.name }}</span>
{% endif -%}
{% if channel.mode == 'a' -%}
  - Frequencies:

	<table class="freqtbl">
		<tr>
			<th>Sub<wbr>channel</th>
			<th>Frequency</th>
			<th>Shared with</th>
		</tr>
		{% for freq in channel.subchannels %}
			<tr{% if freq[1].shared.size > 0 %} class="shared"{% endif %}>
				<td>{{ freq[0] | upcase }}</td>
				<td>{{ freq[1].frequency | precision: 3 }} MHz</td>
				<td>{{ freq[1].shared | join: ', ' }}</td>
			</tr>
		{% endfor %}
	</table>
{% elsif channel.mode == 'c' -%}
  - Frequency: {{ channel.subchannels.s.frequency | precision: 3 }} MHz
{% endif %}

{% endfor %}

References
----------

[^adifcolor]: [ET 03.366.101.8 1st edition](casetas.pdf), page 9.
[^cnaf]: [Cuadro Nacional de Atribución de Frecuencias, Notas UN](cnaf-un-2017.pdf), 2017 edition, UN-78.
[^afergodella]: [El sistema Tren-Tierra en España](http://www.afergodella.es/el-sistema-tren-tierra-analogico-en-espana/), Asociación Ferroviaria de Godella, 2013.
